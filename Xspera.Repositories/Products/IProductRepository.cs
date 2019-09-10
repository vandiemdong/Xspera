using System.Collections.Generic;
using System.Threading.Tasks;

namespace Xspera.Repositories.Products
{
    public interface IProductRepository
    {
        Task<IEnumerable<Xspera.Models.Products>> GetAll(int brandId, int pageSize, int pageNumber);

        Task<Xspera.Models.Products> GetById(int id);
    }
}
