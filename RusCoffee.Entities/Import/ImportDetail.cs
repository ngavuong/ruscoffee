using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class ImportDetail
    {
        public Guid ImportDetailID { get; set; }
        //Mã phiếu nhập
        public string ImportCode { get; set; }
        public string ProductCode { get; set; }
        //Khối lượng nhập
        public float ProductMass { get; set; }
        public float ProductPrice { get; set; }
    }
}
