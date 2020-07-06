using System;
using System.Collections.Generic;
using System.Text;

namespace RusCoffee.Entities
{
    public class SaveInvoice
    {
        public Invoice Master { get; set; }
        public string DetailItem { get; set; }
    }
}
