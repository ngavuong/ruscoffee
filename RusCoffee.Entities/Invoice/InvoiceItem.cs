using System;
using System.Collections.Generic;
using System.Text;

namespace RusCoffee.Entities
{
    public class InvoiceItem
    {
        public Guid InvoiceID { get; set; }
        public string DetailItem { get; set; }
    }
}
