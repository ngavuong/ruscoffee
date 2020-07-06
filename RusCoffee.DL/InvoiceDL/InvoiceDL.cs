using Newtonsoft.Json;
using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace RusCoffee.DL
{
    public class InvoiceDL : BaseDL
    {

        public List<Invoice> GetInvoices()
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetInvoices]";
                //sqlCommand.Parameters.AddWithValue("@PageNumber", pageNumber);
                //sqlCommand.Parameters.AddWithValue("@PageSize", pageSize);
                //sqlCommand.Parameters.AddWithValue("@Condition", conditionString);
                //sqlCommand.Parameters.AddWithValue("@FirstRowLicenseNumber", paymentID);


                List<Invoice> invoices = GetData<Invoice>(sqlCommand);
                return invoices;
            }
        }

        public List<Invoice> GetInvoicesPaging(int pageNumber, string fromDate, string toDate)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetInvoices_Paging]";
                sqlCommand.Parameters.AddWithValue("@pageNumber", pageNumber);
                sqlCommand.Parameters.AddWithValue("@fromDate", fromDate);
                sqlCommand.Parameters.AddWithValue("@toDate", toDate);
                //sqlCommand.Parameters.AddWithValue("@FirstRowLicenseNumber", paymentID);

                List<Invoice> invoices = GetData<Invoice>(sqlCommand);
                return invoices;
            }
        }

        public List<Invoice> GetInvoicesByDate(string today)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetInvoice_ByDate]";
                sqlCommand.Parameters.AddWithValue("@InvoiceDate", today);
                List<Invoice> invoices = GetData<Invoice>(sqlCommand);
                return invoices;
            }
        }


        public int GetTotalPage(string fromDate, string toDate)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetTotalPage]";
                sqlCommand.Parameters.AddWithValue("@fromDate", fromDate);
                sqlCommand.Parameters.AddWithValue("@toDate", toDate);
                var totalPage = sqlCommand.ExecuteScalar();
                return (int)totalPage;
            }
        }

        public List<Invoice> GetInvoiceStatistical(int type, int value)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                List<Invoice> invoices;
                if (type == 0) // thống kê theo tháng
                {
                    sqlCommand.CommandText = "[dbo].[Proc_GetInvoice_ByMonth]";
                    sqlCommand.Parameters.AddWithValue("@InvoiceMonth", value);
                    invoices = GetData<Invoice>(sqlCommand);
                }
                else
                {
                    sqlCommand.CommandText = "[dbo].[Proc_GetInvoice_ByYear]";
                    sqlCommand.Parameters.AddWithValue("@InvoiceYear", value);
                    invoices = GetData<Invoice>(sqlCommand);
                }
                return invoices;
            }
        }
        public void SaveInvoice(Guid invoiceID, Invoice master)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_InsertInvoice]";
                sqlCommand.Parameters.AddWithValue("@InvoiceID", invoiceID);
                sqlCommand.Parameters.AddWithValue("@InvoiceDate", master.InvoiceDate);
                sqlCommand.Parameters.AddWithValue("@EmployeeID", master.EmployeeID);
                sqlCommand.Parameters.AddWithValue("@TotalAmount", master.TotalAmount);
                sqlCommand.Parameters.AddWithValue("@TableNumber", master.TableNumber);
                sqlCommand.ExecuteNonQuery();
            }
        }

        public void SaveInvoiceItem(Guid invoiceID, string detailItem)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();

                //foreach (var detail in details)
                //{
                //    Guid id = Guid.NewGuid();
                //    detail.InvoiceDetailID = id;
                //}
                //string detailList = JsonConvert.SerializeObject(details);
                sqlCommand.CommandText = "[dbo].[Proc_InsertInvoiceItem]";
                sqlCommand.Parameters.AddWithValue("@InvoiceID", invoiceID);
                sqlCommand.Parameters.AddWithValue("@InvoiceItem", detailItem);
                sqlCommand.ExecuteNonQuery();

            }
        }
        public Invoice GetInvoice(Guid id)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();

                sqlCommand.CommandText = "[dbo].[Proc_GetInvoice_ByID]";
                sqlCommand.Parameters.AddWithValue("@invoiceID", id);
                return GetData<Invoice>(sqlCommand).FirstOrDefault();
            }
        }
        public InvoiceItem GetDetailInvoice(Guid id)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();

                sqlCommand.CommandText = "[dbo].[Proc_GetInvoiceItem_ByID]";
                sqlCommand.Parameters.AddWithValue("@invoiceID", id);
                InvoiceItem invoiceItem = GetData<InvoiceItem>(sqlCommand).FirstOrDefault();
                return invoiceItem;
            }
        }
        public void DeleteInvoice(Guid id)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_DeleteInvoice]";
                sqlCommand.Parameters.AddWithValue("@InvoiceID", id);
                sqlCommand.ExecuteNonQuery();
            }
        }
    }
}
