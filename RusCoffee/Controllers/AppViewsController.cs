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
    public class AppViewsController : Controller
    {


        //public object GetPayments([FromBody()] Filter[] filters, int pageNumber, int pageSize, string paymentID)
        //{
        //    var paymentBL = new PaymentBL();
        //    return paymentBL.GetPayments(pageNumber, pageSize, filters, paymentID);
        //}
        //[HttpPost]
        //[Route("invoice/{pageNumber}/{pageSize}/{paymentID}")]
        [Authorize]
        public ActionResult OrderMenu()
        {
            var itemBL = new ItemBL();
            ViewBag.Data = itemBL.GetItems();
            return View();
        }

        [Authorize]
        public ActionResult ChangePassword()
        {
            return View();
        }
        /// <summary>
        /// Lưu hóa đơn
        /// </summary>
        /// <param name="master"></param>
        /// <param name="detailItem"></param>
        [Authorize]
        [Route("invoice/saveinvoice")]
        [HttpPost]
        public void SaveInvocie([FromBody()] SaveInvoice saveInvoice)
        {
            try
            {
                var invoiceBL = new InvoiceBL();
                invoiceBL.SaveInvoice(saveInvoice.Master, saveInvoice.DetailItem);
            }
            catch (Exception)
            {
            }
            
        }

        [Authorize]
        [Route("invoicestatistical/{type}/{value}")]
        [HttpGet]
        public List<Invoice> GetInvoiceStatistical(int type, int value)
        {
            try
            {
                var invoiceBL = new InvoiceBL();
                List<Invoice> invs;
                invs = invoiceBL.GetInvoiceStatistical(type, value);
                return invs;
            }
            catch (Exception)
            {
                return null;
            }
            
        }


        [Authorize]
        [Route("invoiceitem/{id}")]
        [HttpGet]
        public InvoiceItem GetDetailInvoice(Guid id)
        {
            try
            {
                var invoiceBL = new InvoiceBL();
                return invoiceBL.GetDetailInvoice(id);
            }
            catch (Exception)
            {
                return null;
            }
            
        }

        [Authorize]
        [Route("invoice/{id}")]
        [HttpGet]
        public Invoice GetInvoice(Guid id)
        {
            var invoiceBL = new InvoiceBL();
            return invoiceBL.GetInvoice(id);
        }

        [Authorize]
        [Route("invoice/{id}")]
        [HttpDelete]
        public void DeleteInvoice(Guid id)
        {
            try
            {
                var invoiceBL = new InvoiceBL();
                invoiceBL.DeleteInvoice(id);
            }
            catch (Exception)
            {

                throw;
            }
            
        }
        public ActionResult Profile()
        {
            return View();
        }

        //[Route("invoice/getuser")]
        //[HttpGet]
        //public void GetUser()

        //{
        //    var identity = HttpContext.User.FindFirst("UserName").Value;
        //}

    }
}