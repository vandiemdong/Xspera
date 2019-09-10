using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Xspera.Repositories.Users
{
    public interface IUserRepository
    {
        Task<Xspera.Models.Users> GetByUsername(string username);

        Task<int> Create(string username);
    }
}
