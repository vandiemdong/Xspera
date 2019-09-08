var ProductDetail = (function () {

    var patch = snabbdom.patch,
        h = snabbdom.h;

    function controller() {       
        this.data = [];
        this.productId = null;
        this.username = '';
        this.comment = '';
        this.rating = 0;
    }

    controller.prototype.DefineLayout = function () {
        var data = this.data;

        if (data)
            return h('div.row', [
                h('div.col-md-6.section-left', h('img', {
                    props: {
                        src: data.image
                    },
                    style: {
                        width: '100%'
                    }
                })),
                h('div.col-md-6.section-right', [
                    h('h1.product-name', data.name),
                    h('span.description', data.description),
                    h('hr', ''),
                    h('div.form-row', [
                        h('div.form-group.col-md-6', h('input.form-control', {
                            props: {
                                'placeholder': 'Username'
                            },
                            on:
                            {
                                change: [this.ValueChanged, this, 'username']
                            }
                        }, {})),
                        h('div#rating.form-group.col-md-6', this.RenderRating(10, true, 0))

                    ]),
                    h('div.form-row', [
                        h('div.form-group.col-md-12',
                            h('textarea.form-control', {
                                props: {
                                    'placeholder': 'Comment'
                                },
                                on:
                                {
                                    change: [this.ValueChanged, this, 'comment']
                                }
                            }, {}))

                    ]),
                    h('div.form-row.col-md-12', h('div#error-message')),
                    h('div.form-row', [
                        h('div.form-group.col-md-12', [
                            h('button.btn.btn-dark', {
                                on:
                                {
                                    click: [this.AddReview, this]
                                }
                            }, 'Add review'),
                            h('hr', '')])

                    ]),

                    this.RenderReview(data.reviews)

                ])
            ]);
        else
            return h('div.row', {},
                h('div', {
                    style: {
                        'text-align': 'center'
                    }
                }, [
                        h('h2', "We're sorry!"),
                        h('h3', "The product you have requested cannot be found.")
                    ])
            );
    };

    controller.prototype.RenderReview = function (data) {

        if (!data.length) return;

        var result = [];

        for (var i = 0; i < data.length; i++) {
            var div1 = h('div.col-md-2', h('img.avatar', {
                props: {
                    src: 'https://www.logicprohelp.com/forum/styles/canvas/theme/images/no_avatar.jpg'
                }
            }));

            result.push(div1);

            var div2 = h('div.col-md-10', [
                h('h4', {
                    style: {
                        'margin-top': '0px'
                    }
                }, data[i].username),
                h('p', this.RenderRating(10, false, data[i].rating)),
                h('p', data[i].reviewSummary)

            ]);

            result.push(div2);
        }

        return h('div', result);
    };

    controller.prototype.RenderRating = function (numberStar, hasEventClick, fillStarRating) {
        var result = [];
       
        for (var i = 0; i < numberStar; i++) {
            var _class = 'far fa-star';

            if (i < fillStarRating) {
                _class = 'fas fa-star';
            }

            var html = h('i', {
                props: { className: _class },
                style: {
                    'cursor': 'pointer'
                },
                on: {}               
            }, '');

            if (hasEventClick) {
                html.data.on.click = [this.RatingClicked, this, i + 1];
            }
            result.push(html);
        }
        return result;
    };

    controller.prototype.RenderErrorMessages = function (data) {
        if (!data.length) return;

        var result = [];
        for (var i = 0; i < data.length; i++) {
            var p = h('p', '- ' + data[i])
            result.push(p);
        }

        controller.vnode = document.getElementById('error-message');
        document.getElementById('error-message').innerHTML = '';
        var html = h('div#error-message.alert.alert-danger', result);
        controller.vnode = patch(controller.vnode, html);
    };

    controller.prototype.RatingClicked = function (controller, index) {       
       
        controller.rating = index;      

        controller.vnode = document.getElementById('rating');
        document.getElementById('rating').innerHTML = '';
        var html = h('div#rating.form-group.col-md-6', controller.RenderRating(10, true, index));
        controller.vnode = patch(controller.vnode, html);
    };

    controller.prototype.AddReview = function (controller) {
        var messages = [];

        if (!controller.username) {
            messages.push('Username is required!');
        }

        if (!controller.comment) {
            messages.push('Comment is required!');
        }

        if (messages.length) controller.RenderErrorMessages(messages);
        else {
            controller.vnode = document.getElementById('error-message');
            document.getElementById('error-message').innerHTML = '';

            var dataObj = {
                ProductId: controller.productId,
                Username: controller.username,
                Comment: controller.comment,
                Rating: controller.rating
            };


            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '/api/reviews/create',
                dataType: "json",
                data: JSON.stringify(dataObj),
                success: function (response) {
                    if (response.resultId) {
                        location.href = '/';
                    }
                }
            });
        }
    };

    controller.prototype.ValueChanged = function (controller, key, e) {

        controller[key] = e.target.value;

    };

    controller.prototype.Render = function () {
        var self = this;
        var param = self.GetUrlVars()["id"];

        $.ajax({
            type: 'GET',
            url: '/api/products/getbyid/' + param,
            contentType: 'application/json;',
            dataType: 'json',
            success: function (response) {
                self.vnode = document.getElementById('product-detail');
                self.data = response.data;
                self.productId = response.data && response.data.id;
                self.vnode = patch(self.vnode, self.DefineLayout());
            }
        });
    };

    controller.prototype.GetUrlVars = function () {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = value;
            });
        return vars;
    };

    return controller;

})();
