using System;
using System.Collections.Generic;
using System.Text;

namespace Xspera.Models
{
    public class Reviews
    {
        public int ProductID { get; set; }
        public string Username { get; set; }

        public string ReviewSummary { get; set; }

        public int Rating { get; set; }
    }

    public class ReviewsCreate
    {
        public string Username { get; set; }

        public string Comment { get; set; }

        public int ProductId { get; set; }

        public int Rating { get; set; }

        public int UserID { get; set; }
    }
}
