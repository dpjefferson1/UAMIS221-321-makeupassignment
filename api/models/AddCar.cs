using api.Models;
using MySql.Data.MySqlClient;

namespace api.Models
{
    public class AddCar
    {
        public void Add(Cars cars)
        {
            Database db = new Database();
            string cs = db.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO (carID, make, model, mileage, date, hold, deleted) VALUES(@carID, @make, @model, @mileage, @date, @hold, @deleted)";

            using var cmd = new MySqlCommand(stm,con);

            cmd.Parameters.AddWithValue("@carID",cars.carID);
            cmd.Parameters.AddWithValue("@make",cars.make);
            cmd.Parameters.AddWithValue("@model",cars.model);
            cmd.Parameters.AddWithValue("@mileage",cars.mileage);
            cmd.Parameters.AddWithValue("@date",cars.date);
            cmd.Parameters.AddWithValue("@hold",cars.hold);
            cmd.Parameters.AddWithValue("@deleted",cars.deleted);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }
    }
}