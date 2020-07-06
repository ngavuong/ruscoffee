using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Web;

namespace RusCoffee.Entities
{
    public class ItemModel
    {
        public Guid ItemID { get; set; }
        public string ItemName { get; set; }
        //Đơn vị tính
        public int ItemStatus { get; set; }
        public decimal UnitPrice { get; set; }
        public string UnitName { get; set; }
        public IFormFile File { get; set; }

    }
}
