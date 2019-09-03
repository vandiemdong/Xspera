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
        [HttpGet]
        public async Task<IEnumerable<Xspera.Models.Products>> GetAll()
        {
            var products = await _productService.GetAllProducts();

            foreach (var item in products)
            {
                item.Reviews = await _reviewService.GetByProductId(item.ID);
            }


            return products;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
