using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class InvoiceDetail
    {
        public Guid InvoiceDetailID { get; set; }
        public Guid InvoiceID { get; set; }
        public Guid ItemID { get; set; }
        public float Quantity { get; set; }
        public float Amount { get; set; }
    }
}
