using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RusCoffee.BL;
using RusCoffee.DL;
using RusCoffee.Entities;
using RusCoffee.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RusCoffee.Services
{
    public interface IUserService
    {
        public string Authenticate(string username, string password);
        public IEnumerable<User> GetAll();
        public IEnumerable<User> GetUserByName(string name);
        public User GetById(Guid id);
        public void Delete(Guid id);
        public string CreateUser(User user, int mode);
        public void DeleteUser(Guid Id);
        public string GetMD5Password(string password);
        public void ChangePassword(Guid id,string newpassword);
    }

    public class UserService : IUserService
    {
        private static UserDL _userDL = new UserDL();
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        //private List<User> _users = new List<User>
        //{ 
        //    new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" } 
        //};

        private IEnumerable<User> _users = _userDL.GetUsers();
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public string Authenticate(string username, string password)
        {
            var pass_md5 = GetMD5Password(password);
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == pass_md5);

            // return null if user not found
            if (user == null)
                return null;
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("FullName", user.FullName),
                    new Claim("UserCode", user.UserCode),
                    new Claim("RoleType", user.RoleType.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
            //Response.Cookies.Append("accessToken", user.Token);
            //return user.Token;
        }

        public IEnumerable<User> GetAll()
        {
            return _users.WithoutPasswords();
        }

        public IEnumerable<User> GetUserByName(string name)
        {
            if (String.IsNullOrEmpty(name))
            {
                return _users.Where(u=>u.RoleType!=1).ToList();
            }
            return _users.Where(u => u.FullName.Contains(name)&& u.RoleType!=1).ToList();
        }

        public User GetById(Guid id)
        {
            return _users.SingleOrDefault(x => x.Id == id);
        }

        public void Delete(Guid id)
        {
            var user = _users.SingleOrDefault(x => x.Id == id);
            if (user != null)
            {
                _users = _users.Where(a => a.Id == id).ToList();

            }
        }

        public string GetMD5Password(string password)
        {
            string str_md5 = "";
            byte[] arr = System.Text.Encoding.UTF8.GetBytes(password);

            MD5CryptoServiceProvider my_md5 = new MD5CryptoServiceProvider();
            arr = my_md5.ComputeHash(arr);

            foreach (byte b in arr)
            {
                str_md5 += b.ToString("X2");
            }

            return str_md5;
        }
        public string CreateUser(User user,int mode)
        {
            // validation
            string result = "Success";
            var userDL = new UserDL();

            user.Password = GetMD5Password(user.Password);
            if (mode == 1)
            {
                if (string.IsNullOrWhiteSpace(user.Password))
                    return "PasswordNotEmpty";

                if (_users.Any(x => x.Username == user.Username))
                    return "ExistUserName";
                userDL.CreateUser(user);
            }
            else
            {
                userDL.UpdateUser(user);
            }
            return result;
        }

        public void DeleteUser(Guid Id)
        {
            var userDL = new UserDL();
            userDL.DeleteUser(Id);
        }

        public void ChangePassword(Guid id, string newpassword)
        {
            var userDL = new UserDL();
            var pass_md5 = GetMD5Password(newpassword);
            userDL.ChangePassword(id, pass_md5);
        }
    }
}
