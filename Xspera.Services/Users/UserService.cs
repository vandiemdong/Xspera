using System.Threading.Tasks;

namespace Xspera.Repositories.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository) => _repository = repository;

        public async Task<Models.Users> GetByUsername(string username)
        {
            return await _repository.GetByUsername(username);
        }

        public async Task<int> CreateUser(string username)
        {
            return await _repository.Create(username);
        }

    }
}
