using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class Employee
    {
        public Guid EmployeeID { get; set; }
        public string EmplyeeCode { get; set; }
        public string EmplyeeName { get; set; }
        public Guid PositionID { get; set; }
        public DateTime Birthday { get; set; }
        public int Gender { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        //Ngày vào làm
        public DateTime StartWorkDate { get; set; }
        public float Salary { get; set; }
    }
}
