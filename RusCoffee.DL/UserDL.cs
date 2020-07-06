using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RusCoffee.DL
{
    public class UserDL : BaseDL
    {


        /// <summary>
        /// Hàm lấy danh sách tất cả khách hàng
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: VTNGA(02/11/2019)
        public List<User> GetUsers()
        {
            using (dBContext)
            {
                if (!dBContext.IsOpenConnection())
                {
                    dBContext.OpenConnection();
                }
                dBContext.SetStoreName("[dbo].[Proc_GetUsers]");
                return GetData<User>(sqlCommand);
            }
        }

        public void CreateUser(User user)
        {
            using (dBContext)
            {
                if (!dBContext.IsOpenConnection())
                {
                    dBContext.OpenConnection();
                }
                dBContext.SetStoreName("[dbo].[Proc_CreateUser]");
                sqlCommand.Parameters.AddWithValue("@FullName", user.FullName);
                sqlCommand.Parameters.AddWithValue("@Username", user.Username);
                sqlCommand.Parameters.AddWithValue("@Password", user.Password);
                sqlCommand.Parameters.AddWithValue("@UserCode", user.UserCode);
                sqlCommand.Parameters.AddWithValue("@Address", user.Address);
                sqlCommand.Parameters.AddWithValue("@Gender", user.Gender);
                sqlCommand.Parameters.AddWithValue("@Phone", user.Phone);
                sqlCommand.Parameters.AddWithValue("@Email", user.Email);
                sqlCommand.Parameters.AddWithValue("@StartWorkDate", user.StartWorkDate);
                sqlCommand.Parameters.AddWithValue("@Birthday", user.Birthday);
                sqlCommand.ExecuteNonQuery();
            }
        }
        
        public void UpdateUser(User user)
        {
            using (dBContext)
            {
                if (!dBContext.IsOpenConnection())
                {
                    dBContext.OpenConnection();
                }
                dBContext.SetStoreName("[dbo].[Proc_UpdateUser]");
                sqlCommand.Parameters.AddWithValue("@Id", user.Id);
                sqlCommand.Parameters.AddWithValue("@FullName", user.FullName);
                sqlCommand.Parameters.AddWithValue("@UserCode", user.UserCode);
                sqlCommand.Parameters.AddWithValue("@Address", user.Address);
                sqlCommand.Parameters.AddWithValue("@Gender", user.Gender);
                sqlCommand.Parameters.AddWithValue("@Phone", user.Phone);
                sqlCommand.Parameters.AddWithValue("@Email", user.Email);
                sqlCommand.Parameters.AddWithValue("@StartWorkDate", user.StartWorkDate);
                sqlCommand.Parameters.AddWithValue("@Birthday", user.Birthday);
                sqlCommand.ExecuteNonQuery();
            }
        }

        public void DeleteUser(Guid Id)
        {
            using (dBContext)
            {
                if (!dBContext.IsOpenConnection())
                {
                    dBContext.OpenConnection();
                }
                dBContext.SetStoreName("[dbo].[Proc_DeleteUser]");
                sqlCommand.Parameters.AddWithValue("@Id", Id);
                sqlCommand.ExecuteNonQuery();
            }
        }
        public void ChangePassword(Guid Id,string newpass)
        {
            using (dBContext)
            {
                if (!dBContext.IsOpenConnection())
                {
                    dBContext.OpenConnection();
                }
                dBContext.SetStoreName("[dbo].[Proc_UpdatePassword]");
                sqlCommand.Parameters.AddWithValue("@Id", Id);
                sqlCommand.Parameters.AddWithValue("@NewPassword", newpass);
                sqlCommand.ExecuteNonQuery();
            }
        }
    }
}
