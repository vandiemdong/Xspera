using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xspera.Models;
using Xspera.Repositories.Reviews;

namespace Xspera.Services.Reviews
{
   

    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _repository;

        public ReviewService(IReviewRepository repository) => _repository = repository;

        public async Task<int> CreateReview(ReviewsCreate model)
        {
            return await _repository.Create(model);
        }

        public async Task<IEnumerable<Models.Reviews>> GetByProductId(int productId)
        {
            return await _repository.GetByProductId(productId);
        }
    }
}
