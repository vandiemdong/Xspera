var ProductDetail = (function () {

    var patch = snabbdom.patch,
        h = snabbdom.h;



    function controller() {

        this.ratingStar = [
            {
                star: 1,
                className: 'far fa-star'
            },
            {
                star: 2,
                className: 'far fa-star'

            },
            {
                star: 3,
                className: 'far fa-star'
            },
            {
                star: 4,
                className: 'far fa-star'
            },
            {
                star: 5,
                className: 'far fa-star'
            },
            {
                star: 6,
                className: 'far fa-star'
            },
            {
                star: 7,
                className: 'far fa-star'
            },
            {
                star: 8,
                className: 'far fa-star'
            },
            {
                star: 9,
                className: 'far fa-star'
            },
            {
                star: 10,
                className: 'far fa-star'
            }
        ];
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
                        h('div.form-group.col-md-6', h('input.form-control', {})),
                        h('div#rating.form-group.col-md-6', this.RenderRating())

                    ]),
                    h('div.form-row', [
                        h('div.form-group.col-md-12',
                            h('textarea.form-control', {}))

                    ]),
                    h('div.form-row', [
                        h('div.form-group.col-md-12',
                            h('button.btn.btn-dark', 'Comment'))

                    ]),
                    h('div', [h('div.col-md-2', h('img.avatar', {
                        props: {
                            src: 'https://www.w3schools.com/howto/img_avatar.png'
                        },
                        style: {
                            width: '100%'
                        }
                    })),
                    h('div.col-md-5', 'gsdgdsg')])
                ])
            ]);
        else
            return h('div.row', {},
                h('div.', {
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
            var html = [
                h('div.col-md-1', h('img', {
                    props: {
                        src: 'https://www.w3schools.com/howto/img_avatar.png'
                    },
                    style: {
                        width: '100%'
                    }
                })),
                h('div.col-md-5', 'gsdgdsg')

            ];

            result.push(html);
        }

        return result;
    };

    controller.prototype.RenderRating = function () {
        var self = this;
        var result = [];
        var data = this.ratingStar;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var html = h('i', {
                props: { className: item.className },
                on:
                {
                    click: [this.RatingClicked, self, item.star]
                }
            }, '');
            result.push(html);
        }
        return result;
    };

    controller.prototype.RatingClicked = function (controller, index) {

        var star = controller.ratingStar;

        for (var i = 0; i < index; i++) {
            var item = star[i];
            item.className = 'fas fa-star';
        }

        for (var i = index; i < star.length; i++) {
            var item = star[i];
            item.className = 'far fa-star';
        }

        controller.vnode = document.getElementById('rating');
        document.getElementById('rating').innerHTML = '';
        var html = h('div#rating.form-group.col-md-6', controller.RenderRating());
        controller.vnode = patch(controller.vnode, html);
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
