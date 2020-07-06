using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RusCoffee.BL;
using RusCoffee.Entities;

namespace ASPNET_Core_2_1.Controllers
{
    public class EmployeeController : Controller
    {


        //public object GetPayments([FromBody()] Filter[] filters, int pageNumber, int pageSize, string paymentID)
        //{
        //    var paymentBL = new PaymentBL();
        //    return paymentBL.GetPayments(pageNumber, pageSize, filters, paymentID);
        //}
        //[HttpPost]
        //[Route("invoice/{pageNumber}/{pageSize}/{paymentID}")]
        //[Authorize]
        public ActionResult EmployeeList()
        {
            try
            {
                var itemBL = new ItemBL();
                ViewBag.Data = itemBL.GetItems();
                return View();
            }
            catch (Exception)
            {
                return null;
            }
            
        }

    }
}