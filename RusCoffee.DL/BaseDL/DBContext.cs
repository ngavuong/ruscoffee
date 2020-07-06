using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace RusCoffee.DL
{
    public class DBContext : IDisposable
    {
        private string _connectionString = @"Data Source=51S4PERS4MWYWNI\SQLEXPRESS;Initial Catalog=RusCoffee;Integrated Security=True";
        private SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;
        private SqlTransaction _sqlTransaction;
        public DBContext()
        {
            _sqlConnection = new SqlConnection(_connectionString);
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlConnection.Open();
        }

        /// <summary>
        /// Hàm gán tên store cho đối tượng SqlCommnand
        /// </summary>
        /// <param name="storeName"></param>
        /// <returns></returns>
        /// CreatedBy: VTNGA(31/12/2019)
        public void SetStoreName(string storeName)
        {

            _sqlCommand.CommandText = storeName;
        }

        /// <summary>
        /// Hàm khởi tạo transaction
        /// </summary>
        /// CreatedBy: VTNGA(31/12/2019)
        public void SetTransaction()
        {
            _sqlTransaction = _sqlConnection.BeginTransaction();
            _sqlCommand.Transaction = _sqlTransaction;
        }

        /// <summary>
        /// Hàm commit transaction khi thêm, sửa, xóa thành công
        /// </summary>
        /// CreatedBy: VTNGA(31/12/2019)
        public void CommitTransaction()
        {
            _sqlTransaction.Commit();
        }

        /// <summary>
        /// Hàm gán giá trị cho parameter được yêu cầu trong procedure.
        /// </summary>
        /// <param name="param"></param>
        /// <param name="value"></param>
        /// CreatedBy: VTNGA(31/12/2019)
        public void AddWithValue<T>(string param, T value)
        {
            _sqlCommand.Parameters.AddWithValue(param, value);
        }

        /// <summary>
        /// Hàm trả về đối tượng SqlCommand
        /// </summary>
        /// CreatedBy: VTNGA(31/12/2019)
        public SqlCommand GetSqlCommand()
        {
            return _sqlCommand;
        }

        /// <summary>
        /// Hàm trả về đối tượng SqlDataReader
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: VTNGA(31/12/2019)
        public SqlDataReader ExcuteDataReader()
        {
            return _sqlCommand.ExecuteReader();
        }

        /// <summary>
        /// Hàm thực hiện ExecuteScalar() và trả về giá trị tương ứng.
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: VTNGA(31/12/2019)
        public object ExecuteScalar()
        {
            return _sqlCommand.ExecuteScalar();
        }

        /// <summary>
        /// Hàm kiểm tra SqlConnection có đang được mở không.
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: VTNGA(31/12/2019)
        public bool IsOpenConnection()
        {
            if (_sqlConnection.State == ConnectionState.Closed)
            {
                return false;
            }
            return true;
        }
        /// <summary>
        /// Hàm mở SqlConnection.
        /// </summary>
        /// CreatedBy: VTNGA(31/12/2019)
        public void OpenConnection()
        {
            _sqlConnection.Open();
        }

        /// <summary>
        /// Hàm thực hiện đóng kết nối mỗi khi đối tượng DBContext bị hủy.
        /// </summary>
        /// CreatedBy: VTNGA(31/12/2019)
        public void Dispose()
        {
            _sqlConnection.Close();
        }
    }
}
