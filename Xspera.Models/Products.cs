using System;
using System.Collections.Generic;

namespace Xspera.Models
{
    public class Products
    {
        public int ID { get; set; }
        public int BrandID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Color { get; set; }
        public string Image { get; set; }
        public DateTime CreatedDate { get; set; }

        public IEnumerable<Reviews> Reviews { get; set; }

    }
}
