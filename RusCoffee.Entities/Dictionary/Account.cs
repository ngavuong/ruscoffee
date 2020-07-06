using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class Account
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string EmployeeCode { get; set; }
        public int Role { get; set; }
    }
}
