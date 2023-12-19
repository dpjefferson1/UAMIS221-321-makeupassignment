using api.Models;
using MySql.Data.MySqlClient;

namespace api.Models
{
    public class HoldCars
    {
        public void Hold(string carID)
        {
            Database db = new Database();
            string cs = db.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"UPDATE cars SET hold = 1 WHERE carID = @carID";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@carID", carID);
            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }

        public void UnHold(string carID)
        {
            Database db = new Database();
            string cs = db.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"UPDATE cars SET hold = 0 WHERE carID = @carID";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@carID", carID);
            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }
    }
}