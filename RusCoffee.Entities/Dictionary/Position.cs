using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RusCoffee.Entities
{
    public class Position
    {
        public Guid PositionID { get; set; }
        public string PositionName { get; set; }
        public string PositionCode { get; set; }
    }
}
