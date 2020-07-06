using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RusCoffee.Entities
{
    public class ChangePassword
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ReNewPassword { get; set; }
    }
}
