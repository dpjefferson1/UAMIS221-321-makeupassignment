using api.Models;
using MySql.Data.MySqlClient;

namespace api.Models
{
    public class GetCars
    {
        public List<Cars> GetAllCars(){
            List<Cars> car = new List<Cars>();

            Database db = new Database();
            string cs = db.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(stm,con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            while(rdr.Read()){
                car.Add(new Cars(){
                    carID = rdr.GetString(0),
                    make = rdr.GetString(1),
                    model = rdr.GetString(2),
                    mileage = rdr.GetInt32(3),
                    date = rdr.GetDateTime(4),
                    hold = rdr.GetBoolean(5),
                    deleted = rdr.GetBoolean(6)
                });
            }

            return car;
        }
    }
}