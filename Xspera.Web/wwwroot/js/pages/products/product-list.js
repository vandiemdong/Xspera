var ProductList = (function () {

    var patch = snabbdom.patch,
        h = snabbdom.h;


    function controller() {       

    }

   

    controller.prototype.DefineLayout = function () {
        var data = this.data;

        return h('div.row', {}, this.RenderProduct(data));
    };

    controller.prototype.RenderProduct = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var html = h('div.col-md-3',
                h('div.product-container',
                    [
                        h('img', {
                            props: {
                                src: data[i].image
                            },
                            style: {
                                width: '100%',
                                height: '260px'
                            }
                        }),
                        h('span', 'Hello'),  
                        h('br', ''),
                        h('span', '100USD')
                    ])
            );

            res.push(html);
        }
        return res;
    };

    controller.prototype.Render = function () {
        var self = this;
        $.ajax({
            type: 'GET',
            url: '/api/products/getall',
            contentType: 'application/json;',
            dataType: 'json',
            success: function (data) {
                self.vnode = document.getElementById('product-list');

                self.data = data;

                self.vnode = patch(self.vnode, self.DefineLayout());
            }
        });


        
    };

    return controller;

})();
