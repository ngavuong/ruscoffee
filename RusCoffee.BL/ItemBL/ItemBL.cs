using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using RusCoffee.DL;
using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace RusCoffee.BL
{
    public class ItemBL
    {
        private ItemDL _itemDL = new ItemDL();
        /// <summary>
        /// Lấy danh sách hóa đơn
        /// </summary>
        /// <returns></returns>
        public List<Item> GetItems()
        {
            List<Item> intems = _itemDL.GetItems();
            return intems;
        }
        public void SaveItem(ItemModel itemModel, IHostingEnvironment hostingEnvironment)
        {
            Item item = new Item();
            item.ItemName = itemModel.ItemName;
            item.ItemStatus = itemModel.ItemStatus;
            item.UnitName = itemModel.UnitName;
            item.UnitPrice = itemModel.UnitPrice;
            string uniqueFileName = null;
            if (itemModel.File != null)
            {
                string uploadFolder = Path.Combine(hostingEnvironment.WebRootPath, "upload");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + itemModel.File.FileName;
                string filePath = Path.Combine(uploadFolder, uniqueFileName);
                itemModel.File.CopyTo(new FileStream(filePath, FileMode.Create));
            }
            item.ImagePath = uniqueFileName;
            ItemDL itemDL = new ItemDL();
            itemDL.SaveItem(item);
        }

        public void EditItem(ItemModel itemModel, IHostingEnvironment hostingEnvironment)
        {
            Item item = new Item();
            item.ItemID = itemModel.ItemID;
            item.ItemName = itemModel.ItemName;
            item.ItemStatus = itemModel.ItemStatus;
            item.UnitName = itemModel.UnitName;
            item.UnitPrice = itemModel.UnitPrice;
            string uniqueFileName = null;
            if (itemModel.File != null)
            {
                string uploadFolder = Path.Combine(hostingEnvironment.WebRootPath, "upload");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + itemModel.File.FileName;
                string filePath = Path.Combine(uploadFolder, uniqueFileName);
                itemModel.File.CopyTo(new FileStream(filePath, FileMode.Create));
            }
            item.ImagePath = uniqueFileName;
            ItemDL itemDL = new ItemDL();
            itemDL.EditItem(item);
        }

        public void DeleteItem(Guid itemID)
        {
            ItemDL itemDL = new ItemDL();
            itemDL.DeleteItem(itemID);
        }

        public Item GetItemByID(Guid itemID)
        {
            ItemDL itemDL = new ItemDL();
            return itemDL.GetItemByID(itemID);
        }
    }
}
