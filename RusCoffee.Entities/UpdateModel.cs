using System;
using System.Collections.Generic;
using System.Text;

namespace RusCoffee.Entities
{
    public class UpdateModel
    {
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string UserCode { get; set; }
        public string PositionCode { get; set; }
        public string Token { get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }
        public decimal Salary { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string StartWorkDate { get; set; }
        public string Birthday { get; set; }
    }
}
