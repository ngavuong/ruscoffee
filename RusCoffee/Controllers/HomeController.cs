using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RusCoffee.BL;
using RusCoffee.Entities;
using RusCoffee.Models;
using RusCoffee.Services;

namespace RusCoffee.Controllers
{

    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IUserService _userService;

        public HomeController(
            ILogger<HomeController> logger,
            IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(AuthenticateModel model)
        {
            try
            {
                string token = _userService.Authenticate(model.Username, model.Password);
                if (token == null)
                {
                    ViewBag.Error = true;
                    return View("Login");
                }
                    
                Response.Cookies.Append("JWToken", token);
                HttpContext.Session.SetString("JWToken", token);
                CommonFn.SetToken(token);
                return RedirectToAction("Index", "Home");
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [Authorize]
        public IActionResult Logout()
        {
            try
            {
                Response.Cookies.Delete("JWToken");
                HttpContext.Session.Remove("JWToken");
                return RedirectToAction("Login", "Home");
            }
            catch (Exception)
            {
                return null;
            }
            
        }
    }
}
