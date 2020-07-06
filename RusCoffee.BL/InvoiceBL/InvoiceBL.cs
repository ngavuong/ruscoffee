using RusCoffee.DL;
using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RusCoffee.BL
{
    public class InvoiceBL
    {
        //private InvoiceDL _invoiceDL = new InvoiceDL();

        /// <summary>
        /// Lấy danh sách hóa đơn
        /// </summary>
        /// <returns></returns>
        public List<Invoice> GetInvoices()
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            List<Invoice> invocies = invoiceDL.GetInvoices();
            return invocies;
        }
        public object GetInvoicesPaging(int pageNumber, string fromDate, string toDate)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            InvoiceDL invoiceDL2 = new InvoiceDL();
            List<Invoice> invoices = invoiceDL.GetInvoicesPaging(pageNumber, fromDate, toDate);
            int totalRow = invoiceDL2.GetTotalPage(fromDate, toDate);
            object obj = new { data = invoices, totalRow = totalRow };
            return obj;
        }

        public List<Invoice> GetInvoicesByDate(string today)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            List<Invoice> invocies = invoiceDL.GetInvoicesByDate(today);
            return invocies;
        }

        /// <summary>
        /// Lưu hóa đơn
        /// </summary>
        /// <param name="master"></param>
        /// <param name="detailItem"></param>
        public void SaveInvoice(Invoice master, string detailItem)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            InvoiceDL invoiceItemDL = new InvoiceDL();
            Guid invoiceID = Guid.NewGuid();
            invoiceDL.SaveInvoice(invoiceID, master);
            invoiceItemDL.SaveInvoiceItem(invoiceID, detailItem);
        }

        public List<Invoice> GetInvoiceStatistical(int type, int value)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            List<Invoice> invs;
            invs = invoiceDL.GetInvoiceStatistical(type,value);
            return invs;
        }

        public InvoiceItem GetDetailInvoice(Guid id)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            return invoiceDL.GetDetailInvoice(id);
        }

        public Invoice GetInvoice(Guid id)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            return invoiceDL.GetInvoice(id);
        }
        public void DeleteInvoice(Guid id)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            invoiceDL.DeleteInvoice(id);
        }
        public int GetTotalPage(string fromDate, string toDate)
        {
            InvoiceDL invoiceDL = new InvoiceDL();
            return invoiceDL.GetTotalPage(fromDate, toDate);
        }


    }
}
