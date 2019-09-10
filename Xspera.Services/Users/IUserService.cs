using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Xspera.Repositories.Users
{
    public interface IUserService
    {
        Task<Models.Users> GetByUsername(string username);

        Task<int> CreateUser(string username);
    }
}
