using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Xspera.Web.ApiControllers
{
    [Route("api/reviews/[action]")]
    public class ReviewsApiController : Controller
    {

        // POST api/<controller>
        public struct Review
        {
            public int UserId;
            public int ProductId;
            public int Rating;
            public string Comment;
        };
        [HttpPost]
        public void Post([FromBody]Review model)
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
