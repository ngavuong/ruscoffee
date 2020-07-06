using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RusCoffee.BL;
using RusCoffee.Entities;
using RusCoffee.Services;

namespace ASPNET_Core_2_1.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }



        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            try
            {
                string token = _userService.Authenticate(model.Username, model.Password);
                if (token == null)
                    return BadRequest(new { message = "Username or password is incorrect" });


                Response.Cookies.Append("JWToken", token);
                HttpContext.Session.SetString("JWToken", token);

                return RedirectToAction("Index", "Home");
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var users = _userService.GetAll();
                return Ok(users);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("search")]
        public IActionResult GetUserByName([FromBody]string name)
        {
            try
            {
                var users = _userService.GetUserByName(name);
                return Ok(users);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("createuser/{mode}")]
        public string CreateUser([FromBody]User user, int mode)
        {
            var result = "";
            try
            {
                    result = _userService.CreateUser(user,mode);
            }
            catch (Exception e)
            {
            }
            return result;
        }

        [HttpPost("changepassword")]
        public string ChangePassword([FromBody]ChangePassword change)
        {
            var result = "";
            try
            {
                var token = HttpContext.Session.GetString("JWToken");
                var id = CommonFn.GetUserInfo(token).Id;
                var user = _userService.GetById(id);
                string oldpass_md5 = _userService.GetMD5Password(change.OldPassword);
                if (oldpass_md5 != user.Password)
                {
                    return "OldErr";
                }
                else if (change.NewPassword != change.ReNewPassword)
                {
                    return "NewDifferent";
                }
                else
                {
                    _userService.ChangePassword(id, change.NewPassword);
                }
            }
            catch (Exception e)
            {
            }
            return result;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                var user = _userService.GetById(id);
                return Ok(user);
            }
            catch (Exception)
            {
                return BadRequest();
            }
            
        }
        //[HttpPut("{id}")]
        //public IActionResult Update(int id, [FromBody]UpdateModel model)
        //{
        //    // map model to entity and set id
        //    var user = _mapper.Map<User>(model);
        //    user.Id = id;

        //    try
        //    {
        //        // update user 
        //        _userService.Update(user, model.Password);
        //        return Ok();
        //    }
        //    catch (AppException ex)
        //    {
        //        // return error message if there was an exception
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _userService.DeleteUser(id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
            
        }

        [HttpGet("currentuser")]
        public User GetCurrentUser()
        {
            try
            {
                var token = HttpContext.Session.GetString("JWToken");
                return CommonFn.GetUserInfo(token);
            }

            catch (Exception e)
            {
                //should write log
                return null;
            }
        }
    }
}