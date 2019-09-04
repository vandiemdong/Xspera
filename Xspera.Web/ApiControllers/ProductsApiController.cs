using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Xspera.Services.Products;
using Xspera.Services.Reviews;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Xspera.Web.ApiControllers
{
    [Route("api/products/[action]")]
    public class ProductsApiController : Controller
    {

        private readonly IProductService _productService;
        private readonly IReviewService _reviewService;

        public ProductsApiController(IProductService productService, IReviewService reviewService)
        {
            _productService = productService;
            _reviewService = reviewService;
        }

        // GET: api/<controller>
        [HttpGet("{brandId?}")]
        public async Task<IActionResult> GetAll(int brandId)
        {
            var products = await _productService.GetAllProducts(brandId);

            foreach (var item in products)
            {
                item.Reviews = await _reviewService.GetByProductId(item.ID);
            }

            return Ok(new { isError = false, data = products });
        }


        [HttpGet("{id?}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetById(id);

            if(product !=null)
            {
                product.Reviews = await _reviewService.GetByProductId(product.ID);
            } 

            return Ok(new { isError = false, data = product });
        }
    }
}
