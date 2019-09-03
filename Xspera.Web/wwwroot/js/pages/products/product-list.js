var ProductList = (function () {

    var patch = snabbdom.patch,
        h = snabbdom.h;

    
    function controller() {
        this.data = [
            {
                BrandName: 'Apple',
                ProductID: 1,
                ProductName: 'iPhone X',
                Price: 100.00,
                Description: 'XXX',
                Image: 'https://images.fpt.shop/unsafe/fit-in/465x465/filters:quality(90):fill(white)/cdn.fptshop.com.vn/Uploads/Originals/2017/12/8/636483223586180190_3.jpg',
                Reviews: [
                    {
                        Username: 'vandiemdong',
                        Summary: 'ZZZZ'
                    }, {
                        Username: 'vandiemdong2',
                        Summary: 'ZZZZ'
                    }
                ]
            },
            {
                BrandName: 'Apple',
                ProductID: 1,
                ProductName: 'iPhone X',
                Price: 100.00,
                Description: 'XXX',
                Image: 'https://images.fpt.shop/unsafe/fit-in/465x465/filters:quality(90):fill(white)/cdn.fptshop.com.vn/Uploads/Originals/2017/12/8/636483223586180190_3.jpg',
                Reviews: [
                    {
                        Username: 'vandiemdong',
                        Summary: 'ZZZZ'
                    }, {
                        Username: 'vandiemdong2',
                        Summary: 'ZZZZ'
                    }

                ]

            },
            {
                BrandName: 'Apple',
                ProductID: 1,
                ProductName: 'iPhone X',
                Price: 100.00,
                Description: 'XXX',
                Image: 'https://images.fpt.shop/unsafe/fit-in/465x465/filters:quality(90):fill(white)/cdn.fptshop.com.vn/Uploads/Originals/2017/12/8/636483223586180190_3.jpg',
                Reviews: [
                    {
                        Username: 'vandiemdong',
                        Summary: 'ZZZZ'
                    }, {
                        Username: 'vandiemdong2',
                        Summary: 'ZZZZ'
                    }

                ]

            }
        ];
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
                                src: data[i].Image,
                            }
                        }),
                        h('p','Hello')
                    ])
            );
            res.push(html);
        }
        return res;
    };

    controller.prototype.Render = function () {
        this.vnode = document.getElementById('product-list');
        this.vnode = patch(this.vnode, this.DefineLayout());
    };    

    return controller;

})();
