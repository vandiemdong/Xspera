using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Xspera.Repositories.Products
{
    public class ProductRepository : IProductRepository
    {
        #region Connect DB
        private readonly IConfiguration _config;
        public ProductRepository(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("MyConnectionString"));
            }
        }

        public async Task<IEnumerable<Models.Products>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "exec [dbo].[usp_Products_GetAll]";
                conn.Open();
                var result = await conn.QueryAsync<Models.Products>(sQuery);
                return result;
            }
        }
        #endregion
    }
}
