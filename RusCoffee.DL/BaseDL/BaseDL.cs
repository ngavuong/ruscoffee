using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace RusCoffee.DL
{
    public class BaseDL
    {
        protected DBContext dBContext;
        protected SqlCommand sqlCommand;
        public BaseDL()
        {
            dBContext = new DBContext();
            sqlCommand = dBContext.GetSqlCommand();
        }
        /// <summary>
        /// Hàm dùng chung cập nhật thông tin cho các đối tượng.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="procedureName"></param>
        /// <returns></returns>
        /// CreatedBy: VTNGA(30/12/2019)
        public void UpdateEntity<T1>(T1 entity, string procedureName)
        {
            using (DBContext dBContext = new DBContext())
            {
                dBContext.SetTransaction();

                dBContext.SetStoreName(procedureName);
                var sqlCommand = dBContext.GetSqlCommand();
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;
                for (int i = 0; i < parameters.Count; i++)
                {
                    var paramName = parameters[i].ParameterName;
                    paramName = paramName.Replace("@", "");
                    var paymentProperty = entity.GetType().GetProperty(paramName);
                    if (paymentProperty != null)
                    {
                        parameters[i].Value = paymentProperty.GetValue(entity);
                    }
                }
                sqlCommand.ExecuteNonQuery();
                dBContext.CommitTransaction();
            }
        }

        /// <summary>
        /// Hàm xóa phiếu chi và các mục detail tương ứng dựa vào id truyền vào
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy: VTNGA(02/11/2019)
        public void DeleteEntity(Guid id, string proceduceName)
        {
            using (DBContext dBContext = new DBContext())
            {
                dBContext.SetTransaction();
                var sqlCommand = dBContext.GetSqlCommand();
                dBContext.SetStoreName(proceduceName);
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;
                parameters[1].Value = id; //parameters[0] luôn là @Return_Value
                sqlCommand.ExecuteNonQuery();
                dBContext.CommitTransaction();
            }
        }


        /// <summary>
        /// Hàm thực hiện truy vấn Database lấy dữ liệu
        /// </summary>
        /// <parameter name="_SqlCommand"></parameter>
        /// <returns>tập các đối tượng</returns>
        /// CreateBy: VTNGA(02/11/2019)
        public List<T> GetData<T>(SqlCommand SqlCommand)
        {
            List<T> entities = new List<T>();
            SqlDataReader sqlDataReader = SqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fieldName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = entity.GetType().GetProperty(fieldName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(entity, fieldValue);
                    }
                }
                entities.Add(entity);
            }
            return entities;
        }

        /// <summary>
        /// Hàm chuyển dữ liệu kiểu DataTable sang List<>
        /// </summary>
        /// <paramref name="table"/>
        /// <returns></returns>
        /// CreatedBy: VTNGA(02/11/2019)
        //public List<T> DataTableToList<T>(DataTable table)
        //{
        //    List<T> list = new List<T>();

        //    foreach (var row in table.AsEnumerable())
        //    {
        //        T obj = Activator.CreateInstance<T>();

        //        foreach (var prop in obj.GetType().GetProperties())
        //        {
        //            var propertyInfo = obj.GetType().GetProperty(prop.Name);
        //            propertyInfo.SetValue(obj, Convert.ChangeType(row[prop.Name], propertyInfo.PropertyType), null);
        //        }
        //        list.Add(obj);
        //    }
        //    return list;
        //}
    }
}
