var ProductDetail = (function () {

    var patch = snabbdom.patch,
        h = snabbdom.h;

    function controller() { }

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
