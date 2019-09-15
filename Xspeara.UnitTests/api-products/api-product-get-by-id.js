var https = require('https');
var chai = require('chai');
var expect = chai.expect;

describe('ProductsApiController', function () {
    describe('api/products/getbyid', function () {

        it('In case the product exists', function (done) {
            https.get('https://xsperatest.azurewebsites.net/api/products/getbyid/1', function (res) {
                var data = '';
                var expectedResult = {
                    isError: false,
                    data: {
                        brandID: 1,
                        brandName: "Apple",
                        color: 2,
                    }
                };

                res.on('data', function (chunk) {
                    data += chunk;
                });

                res.on('end', function () {
                    var obj = JSON.parse(data);

                    expect(obj.isError).eql(expectedResult.isError);
                    expect(obj.data.brandID).eql(expectedResult.data.brandID);

                    done();
                });
            });
        });

        it('In case the product does not exist', function (done) {
            https.get('https://xsperatest.azurewebsites.net/api/products/getbyid/1000', function (res) {
                var data = '';
                var expectedResult = {
                    isError: false,
                    data: null
                };

                res.on('data', function (chunk) {
                    data += chunk;
                });

                res.on('end', function () {
                    var obj = JSON.parse(data);

                    expect(obj).eql(expectedResult);                    

                    done();
                });
            });
        });
    });
});