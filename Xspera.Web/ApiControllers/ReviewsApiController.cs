using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Xspera.Models;
using Xspera.Services.Reviews;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Xspera.Web.ApiControllers
{
    [Route("api/reviews/[action]")]
    public class ReviewsApiController : Controller
    {       
        private readonly IReviewService _reviewService;

        public ReviewsApiController(IReviewService reviewService)
        {
            
            _reviewService = reviewService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ReviewsCreate model)
        {
            var reviewId = await _reviewService.CreateReview(model);

            return Ok(new {
                resultId = reviewId,
                desciption = reviewId > 0 ? "Successfully created." : "Could not create this reivew." });
        }
       
    }
}
