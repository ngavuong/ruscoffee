using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using RusCoffee.BL;
using RusCoffee.Entities;

namespace ASPNET_Core_2_1.Controllers
{
    public class ItemController : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        public ItemController(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        [Authorize]
        [Route("item/{mode}")]
        [HttpPost]
        public void SaveItem([FromForm] ItemModel itemModel, int mode)
        {
            try
            {
                var itemBL = new ItemBL();
                if (mode == 1)
                {
                    itemBL.SaveItem(itemModel, _hostingEnvironment);
                }
                else
                {
                    itemBL.EditItem(itemModel, _hostingEnvironment);
                }
            }
            catch (Exception)
            {

            }
            
        }

        [Authorize]
        [Route("item/{id}")]
        [HttpDelete]
        public void DeleteItem(Guid id)
        {
            try
            {
                var itemBL = new ItemBL();
                itemBL.DeleteItem(id);
            }
            catch (Exception)
            {

            }
           
        }

        [Authorize]
        [Route("item/{id}")]
        [HttpGet]
        public Item GetItemByID(Guid id)
        {
            try
            {
                var itemBL = new ItemBL();
                return itemBL.GetItemByID(id);
            }
            catch (Exception)
            {
                return null;
            }
            
        }

        [Authorize]
        [Route("itemname")]
        [HttpPost]
        public List<Item> GetItemByName([FromBody]string name)
        {
            try
            {
                var itemBL = new ItemBL();
                List<Item> items = itemBL.GetItems();
                return items.Where(i => i.ItemName.Contains(name)).ToList();
            }
            catch (Exception)
            {
                return null;
            }

        }

    }
}