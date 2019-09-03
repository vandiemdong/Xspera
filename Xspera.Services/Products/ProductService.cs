﻿using System;
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
        public async Task<IEnumerable<Models.Products>> GetAllProducts()
        {
            return await _repository.GetAll();
        }      
    }
}