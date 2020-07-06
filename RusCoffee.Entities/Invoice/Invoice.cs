using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class Invoice
    {
        public Guid InvoiceID { get; set; }
        public string InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public Guid EmployeeID { get; set; }
        public int TableNumber { get; set; }
    }
}
