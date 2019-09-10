using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Xspera.Models;
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
        [HttpGet("{brandId?}/{pageSize?}/{pageNumber?}")]
        public async Task<IActionResult> GetAll(int brandId, int pageSize, int pageNumber)
        {
            var products = await _productService.GetAllProducts(brandId, pageSize, pageNumber);

            if (products.Any())
            {
                var reviews = await _reviewService.GetAll();
                var result = (from pro in products
                              select new Products
                              {
                                  ID = pro.ID,
                                  BrandID = pro.BrandID,
                                  BrandName = pro.BrandName,
                                  Image = pro.Image,
                                  Name = pro.BrandName,
                                  Description = pro.Description,
                                  Price = pro.Price,
                                  CreatedDate = pro.CreatedDate,
                                  Reviews = (from rev in reviews
                                             where rev.ProductID == pro.ID
                                             select rev).ToList()
                              }).AsEnumerable();

                return Ok(new { isError = false, data = result });
            }

            return Ok(new { isError = false, data = products });

        }


        [HttpGet("{id?}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetById(id);

            if (product != null)
            {
                product.Reviews = await _reviewService.GetByProductId(product.ID);
            }

            return Ok(new { isError = false, data = product });
        }
    }
}
