using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class Import
    {
        public Guid ImportID { get; set; }
        public string ImportNumber { get; set; }
        public DateTime ImportDate{ get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string ImportNote { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
