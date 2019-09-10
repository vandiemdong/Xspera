using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xspera.Models;
using Xspera.Repositories.Products;

namespace Xspera.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository) => _repository = repository;
        public async Task<IEnumerable<Models.Products>> GetAllProducts(int brandId, int pageSize, int pageNumber)
        {
            return await _repository.GetAll(brandId, pageSize, pageNumber);
        }

        public async Task<Models.Products> GetById(int id)
        {
            return await _repository.GetById(id);
        }
    }
}
