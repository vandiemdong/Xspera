using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Xspera.Repositories.Reviews
{
   

    public interface IReviewRepository
    {
        Task<IEnumerable<Xspera.Models.Reviews>> GetByProductId(int productId);

        Task<int> Create(Xspera.Models.ReviewsCreate model);
    }
}
