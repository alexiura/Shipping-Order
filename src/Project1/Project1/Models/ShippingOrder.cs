using System;

namespace Project1.Models
{
    public class ShippingOrder
    {
        public Guid Id { get; set; }
        public float OrderNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public string TruckRegNumber { get; set; }
        public string TrailerRegNumber { get; set; }
        public string LoadingAddress { get; set; }
        public DateTime LoadingDate { get; set; }
        public string UnloadingAddress { get; set; }
        public DateTime UnloadingDate { get; set; }
        public int Price { get; set; }
    }
}
