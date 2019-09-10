using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xspera.Models;
using Xspera.Repositories.Users;
using Xspera.Services.Products;
using Xspera.Services.Reviews;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Xspera.Web.ApiControllers
{
    [Route("api/reviews/[action]")]
    public class ReviewsApiController : Controller
    {
        private readonly IReviewService _reviewService;
        private readonly IProductService _productService;
        private readonly IUserService _userService;

        public ReviewsApiController(IReviewService reviewService, IProductService productService, IUserService userService)
        {
            _reviewService = reviewService;
            _productService = productService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ReviewsCreate model)
        {
            List<String> messages = new List<String>();

            var product = await _productService.GetById(model.ProductId);
            var user = await _userService.GetByUsername(model.Username);

            if (product == null)
            {
                messages.Add("Product not found!");
            }

            if (user == null)
            {
                messages.Add("User not found!");
            }
            else
            {
                model.UserID = user.ID;
            }

            if (model.Rating <= 0 && model.Rating > 10)
            {
                messages.Add("Rating must be in range 0-10");
            }

            if (messages.Any())
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    ErrorCode = StatusCodes.Status500InternalServerError,
                    ErrorMessages = string.Join(",", messages)
                });
            }

            var reviewId = await _reviewService.CreateReview(model);

            return Ok(new
            {
                resultId = reviewId,
                desciption = reviewId > 0 ? "Successfully created." : "Could not create this reivew."
            });

        }

    }
}
