using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RusCoffee.BL;
using RusCoffee.DL;
using RusCoffee.Entities;

namespace ASPNET_Core_2_1.Controllers
{
    public class TablesController : Controller
    {
        public IActionResult InvoiceList()
        {
            try
            {
                var userDL = new UserDL();
                List<User> users = userDL.GetUsers();
                ViewBag.UserList = users;
                return View();
            }
            catch (Exception)
            {
                return BadRequest();
            }
            //var invoiceBL = new InvoiceBL();
            //List<Invoice> invoices = invoiceBL.GetInvoices();
            //ViewBag.InvoiceList = invoices;

            
        }

        public IActionResult ItemList()
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

        public ActionResult EmployeeList()
        {
            return View();
        }

        [Authorize]
        [Route("invoicepaging/{pageNumber}")]
        [HttpPost]
        public object InvociePaging([FromBody()] Paging pagingDate, int pageNumber)
        {
            try
            {
                var invoiceBL = new InvoiceBL();
                return invoiceBL.GetInvoicesPaging(pageNumber, pagingDate.FromDate, pagingDate.ToDate);
            }
            catch (Exception)
            {
                return null;
            }

        }

        [Authorize]
        [Route("invoicetoday/{date}")]
        [HttpGet]
        public List<Invoice> GetInvoicesByDate(string date)
        {
            try
            {
                var invoiceBL = new InvoiceBL();
                return invoiceBL.GetInvoicesByDate(date);
            }
            catch (Exception)
            {
                return null;
            }

        }

        public IActionResult MaterialList()
        {
            try
            {
                var userDL = new UserDL();
                List<User> users = userDL.GetUsers();
                ViewBag.UserList = users;
                return View();
            }
            catch (Exception)
            {
                return null;
            }

        }

        [Authorize]
        [Route("importstatistical/{type}/{value}")]
        [HttpGet]
        public List<Import> GetImportStatistical(int type, int value)
        {
            try
            {
                var importBL = new ImportBL();
                List<Import> imps;
                imps = importBL.GetImportStatistical(type, value);
                return imps;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [Authorize]
        [Route("import/{id}")]
        [HttpGet]
        public Import GetImportByID(Guid id)
        {
            try
            {
                var importBL = new ImportBL();
                return importBL.GetImportByID(id);
            }

            catch (Exception)
            {
                return null;
            }
        }


        [Authorize]
        [Route("import/{id}")]
        [HttpDelete]
        public void DeleteImport(Guid id)
        {
            try
            {
                var importBL = new ImportBL();
                importBL.DeleteImport(id);
            }
            catch (Exception)
            {
            }
            
        }

        [Authorize]
        [Route("importpaging/{pageNumber}")]
        [HttpPost]
        public object ImportPaging([FromBody()] Paging pagingDate, int pageNumber)
        {
            try
            {
                var importBL = new ImportBL();
                return importBL.GetImportsPaging(pageNumber, pagingDate.FromDate, pagingDate.ToDate);

            }
            catch (Exception)
            {
                return null;
            }
            
        }

        [Authorize]
        [Route("importtoday/{date}")]
        [HttpGet]
        public List<Import> GetImportsByDate(string date)
        {
            try
            {
                var importBL = new ImportBL();
                return importBL.GetImportsByDate(date);
            }
            catch (Exception)
            {
                return null;
            }
            
        }

        /// <summary>
        /// Lưu phiếu nhập
        /// </summary>
        [Authorize]
        [Route("import/{mode}")]
        [HttpPost]
        public void SaveImport([FromBody] Import import, int mode)
        {
            try
            {
                var importBL = new ImportBL();
                if (mode == 1)
                {
                    importBL.SaveImport(import);
                }
                else
                {
                    importBL.EditImport(import);
                }
            }

            catch (Exception)
            {

            }
        }
            
        public IActionResult FooTables()
        {
            return View();
        }

        public IActionResult jqGrid()
        {
            return View();
        }
    }
}