var ProductDetail = (function () {

    var patch = snabbdom.patch,
        h = snabbdom.h;

    function controller() {}

    controller.prototype.DefineLayout = function () {
        var data = this.data;

        if (data.length)
            return h('div.row', [
                h('div.col-md-6.section-left', h('img', {
                    props: {
                        src: 'https://www.w3schools.com/w3images/tablesetting2.jpg'
                    },
                    style: {
                        width: '100%'                      
                    }
                })),
                h('div.col-md-6.section-right', h('h1.product-name', 'okokok'))
            ]);
        else
            return h('div.row', {},
                h('div.', {
                    style: {
                        'text-align': 'center'
                    }
                }, [
                        h('h2', "We're sorry!"),                        
                        h('h3', "The product you have requested cannot be found."),
                    ])
            );
    };    

    controller.prototype.Render = function () {
        var self = this;
        var param = self.GetUrlVars()["brandId"];

        $.ajax({
            type: 'GET',
            url: '/api/products/getall/' + param,
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
