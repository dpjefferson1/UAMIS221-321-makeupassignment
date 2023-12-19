namespace api.Models
{
    public class Cars
    {
        public string carID {get;set;}

        public string make {get;set;}
        public string model {get;set;}
        public int mileage {get;set;}

        public DateTime date {get;set;}

        public bool hold {get;set;}
        public bool deleted {get;set;}
        
    }
}