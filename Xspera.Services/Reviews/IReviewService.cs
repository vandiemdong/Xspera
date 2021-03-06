﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Xspera.Services.Reviews
{  

    public interface IReviewService
    {
        Task<IEnumerable<Models.Reviews>> GetByProductId(int productId);

        Task<int> CreateReview(Models.ReviewsCreate model);

        Task<IEnumerable<Models.Reviews>> GetAll();
    }
}
