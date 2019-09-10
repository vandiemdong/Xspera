using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xspera.Models;

namespace Xspera.Repositories.Users
{
    public class UserRepository : IUserRepository
    {
        #region Connect DB
        private readonly IConfiguration _config;
        public UserRepository(IConfiguration config)
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


        #endregion

        public async Task<Models.Users> GetByUsername(string username)
        {
            using (IDbConnection conn = Connection)
            {
                string sQuery = "exec [dbo].[usp_Users_GetByUsername] @Username";
                conn.Open();
                var result = await conn.QueryAsync<Models.Users>(sQuery, new { Username = username });
                return result.FirstOrDefault();
            }
        }

        public async Task<int> Create(string username)
        {
            using (var con = new SqlConnection(_config.GetConnectionString("MyConnectionString")))
            {
                con.Open();
                using (IDbTransaction transaction = con.BeginTransaction())
                {
                    try
                    {
                        string query = "exec [dbo].[usp_Users_Create] @Username";
                        var result = await con.QueryAsync<int>(query, new
                        {
                            Username = username
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
    }
}
