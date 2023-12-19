namespace UAMIS221_321_makeupassignment
{
    public class ConnectionString
    {
        public string cs{ get; set;}

        public ConnectionString(){
            string server = "kutnpvrhom7lki7u.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "lwh8mvxp3ykr4nhe";
            string port = "3306";
            string userName = "nogdfnazx3ew0pzk";
            string password = "	mj496i9abf6tzyb6";

            cs = $@"server = {server}; user = {userName}; database = {database}; port = {port}; password = {password}";
        }
    }
}