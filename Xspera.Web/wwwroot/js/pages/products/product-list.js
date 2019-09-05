var ProductList = (function () {

    var patch = snabbdom.patch,
        h = snabbdom.h;


    function controller() {

    }

    controller.prototype.DefineLayout = function () {
        var data = this.data;

        if (data.length)
            return h('div.row', {}, this.RenderProduct(data));
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

    controller.prototype.RenderProduct = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var html = h('div.col-md-3',
                h('div.card',
                    [
                        h('img', {
                            props: {
                                src: data[i].image
                            },
                            style: {
                                width: '100%',
                                height: '185px'
                            }
                        }),
                        h('h4.brand-name', data[i].brandName),                        
                        h('h5.product-name', data[i].name),                        
                        h('p.price', data[i].price + 'USD'),
                        h('p', h('button', {
                            on:
                            {
                                click: [this.ReviewClicked,data[i]]                                    
                            }
                        }, 'Review')),
                        //h('div.review', this.RenderComment(data[i].reviews))
                    ])
            );

            res.push(html);
        }
        return res;
    };

    controller.prototype.RenderComment = function (data) {
        if (!data.length) return;
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var html = h('div',                
                    [                      
                        h('p', data[i].username),                       
                        h('p', data[i].reviewSummary)
                    ]
            );

            res.push(html);
        }
        return res;
    };

    controller.prototype.ReviewClicked = function (data) {
        location.href = '/Product/Index?id=' + data.id;        
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
                self.vnode = document.getElementById('product-list');

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
