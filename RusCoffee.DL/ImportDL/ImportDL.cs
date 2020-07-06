using Newtonsoft.Json;
using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace RusCoffee.DL
{
    public class ImportDL : BaseDL
    {

        public List<Import> GetImports()
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetImports]";
                List<Import> Imports = GetData<Import>(sqlCommand);
                return Imports;
            }
        }

        public List<Import> GetImportsPaging(int pageNumber, string fromDate, string toDate)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetImports_Paging]";
                sqlCommand.Parameters.AddWithValue("@pageNumber", pageNumber);
                sqlCommand.Parameters.AddWithValue("@fromDate", fromDate);
                sqlCommand.Parameters.AddWithValue("@toDate", toDate);
                //sqlCommand.Parameters.AddWithValue("@FirstRowLicenseNumber", paymentID);

                List<Import> Imports = GetData<Import>(sqlCommand);
                return Imports;
            }
        }

        public List<Import> GetImportsByDate(string today)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetImport_ByDate]";
                sqlCommand.Parameters.AddWithValue("@ImportDate", today);
                List<Import> Imports = GetData<Import>(sqlCommand);
                return Imports;
            }
        }

        public int GetTotalImportRow(string fromDate, string toDate)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetTotalImportRow]";
                sqlCommand.Parameters.AddWithValue("@fromDate", fromDate);
                sqlCommand.Parameters.AddWithValue("@toDate", toDate);
                var totalRow = sqlCommand.ExecuteScalar();
                return (int)totalRow;
            }
        }

        public List<Import> GetImportStatistical(int type, int value)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                List<Import> imports;
                if (type == 0) // thống kê theo tháng
                {
                    sqlCommand.CommandText = "[dbo].[Proc_GetImport_ByMonth]";
                    sqlCommand.Parameters.AddWithValue("@ImportMonth", value);
                    imports = GetData<Import>(sqlCommand);
                }
                else
                {
                    sqlCommand.CommandText = "[dbo].[Proc_GetImport_ByYear]";
                    sqlCommand.Parameters.AddWithValue("@ImportYear", value);
                    imports = GetData<Import>(sqlCommand);
                }
                return imports;
            }
        }
        public void SaveImport(Import master)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_InsertImport]";
                sqlCommand.Parameters.AddWithValue("@ImportDate", master.ImportDate);
                sqlCommand.Parameters.AddWithValue("@ImportNumber", master.ImportNumber);
                sqlCommand.Parameters.AddWithValue("@EmployeeCode", master.EmployeeCode);
                sqlCommand.Parameters.AddWithValue("@EmployeeName", master.EmployeeName);
                sqlCommand.Parameters.AddWithValue("@ImportNote", master.ImportNote);
                sqlCommand.Parameters.AddWithValue("@TotalAmount", master.TotalAmount);
                sqlCommand.ExecuteNonQuery();
            }
        }

        public void EditImport(Import import)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_EditImport]";
                sqlCommand.Parameters.AddWithValue("@ImportID", import.ImportID);
                sqlCommand.Parameters.AddWithValue("@ImportDate", import.ImportDate);
                sqlCommand.Parameters.AddWithValue("@ImportNumber", import.ImportNumber);
                sqlCommand.Parameters.AddWithValue("@EmployeeCode", import.EmployeeCode);
                sqlCommand.Parameters.AddWithValue("@EmployeeName", import.EmployeeName);
                sqlCommand.Parameters.AddWithValue("@ImportNote", import.ImportNote);
                sqlCommand.Parameters.AddWithValue("@TotalAmount", import.TotalAmount);
                sqlCommand.ExecuteNonQuery();
            }
        }
        public Import GetImport(Guid id)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();

                sqlCommand.CommandText = "[dbo].[Proc_GetImport_ByID]";
                sqlCommand.Parameters.AddWithValue("@ImportID", id);
                return GetData<Import>(sqlCommand).FirstOrDefault();
            }
        }
       
        public void DeleteImport(Guid id)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_DeleteImport]";
                sqlCommand.Parameters.AddWithValue("@ImportID", id);
                sqlCommand.ExecuteNonQuery();
            }
        }
    }
}
