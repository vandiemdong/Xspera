using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xspera.Models;

namespace Xspera.Repositories.Reviews
{
    public class ReviewRepository : IReviewRepository
    {
        #region Connect DB
        private readonly IConfiguration _config;
        public ReviewRepository(IConfiguration config)
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

        public async Task<int> Create(ReviewsCreate model)
        {
            using (var con = new SqlConnection(_config.GetConnectionString("MyConnectionString")))
            {
                con.Open();
                using (IDbTransaction transaction = con.BeginTransaction())
                {
                    try
                    {
                        string query = "exec [dbo].[usp_Reviews_Create] @UserID, @ProductId, @Comment, @Rating";
                        var result = await con.QueryAsync<int>(query, new
                        {
                            UserID = model.UserID,
                            ProductId = model.ProductId,
                            Comment = model.Comment,
                            Rating = model.Rating
                        }, transaction);
                        transaction.Commit();
                        return result.FirstOrDefault();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();                       
                        throw;
                    }                    
                }
            };           
        }

        public async Task<IEnumerable<Models.Reviews>> GetByProductId(int productId)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "exec [dbo].[usp_Reviews_GetByProductId] @ProductId";
                conn.Open();
                var result = await conn.QueryAsync<Models.Reviews>(sQuery, new { ProductId = productId });
                return result;
            }
        }

        public async Task<IEnumerable<Models.Reviews>> GetAll()
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "exec [dbo].[usp_Reviews_GetAll]";
                conn.Open();
                var result = await conn.QueryAsync<Models.Reviews>(sQuery);
                return result;
            }
        }
        #endregion
    }
}
