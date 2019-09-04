using System.Collections.Generic;
using System.Threading.Tasks;

namespace Xspera.Repositories.Products
{
    public interface IProductRepository
    {        
        Task<IEnumerable<Xspera.Models.Products>> GetAll(int brandId);

        Task<Xspera.Models.Products> GetById(int id);
    }
}
