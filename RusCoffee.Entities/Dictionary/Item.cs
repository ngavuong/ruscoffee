using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class Item
    {
        public Guid ItemID{ get; set; }
        public string ItemName { get; set; }
        //Đơn vị tính
        public int ItemStatus { get; set; }
        public decimal UnitPrice { get; set; }
        public string UnitName { get; set; }
        public string ImagePath { get; set; }
    }
}
