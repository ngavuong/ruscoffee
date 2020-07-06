using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ASPNET_Core_2_1.Controllers
{
    public class PagesController : Controller
    {
        public IActionResult SearchResults()
        {
            return View();
        }

        public IActionResult LockScreen()
        {
            return View();
        }

        public IActionResult Login()
        {
            
            
            
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult NotFoundError()
        {
            return View();
        }

        public IActionResult InternalServerError()
        {
            return View();
        }

        public IActionResult EmptyPage()
        {
            return View();
        }

        public IActionResult ForgotPassword()
        {
            return View();
        }
    }
}