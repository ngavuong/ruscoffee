using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ASPNET_Core_2_1.Controllers
{
    public class DashboardsController : Controller
    {
        public IActionResult Dashboard_1()
        {
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }

    }
}