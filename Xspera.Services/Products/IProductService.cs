using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Xspera.Services.Products
{
    public interface IProductService
    {
        Task<IEnumerable<Models.Products>> GetAllProducts(int brandId);

        Task<Models.Products> GetById(int id);
    }
}
