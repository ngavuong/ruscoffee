using RusCoffee.DL;
using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RusCoffee.BL
{
    public class ImportBL
    {
        /// <summary>
        /// Lấy danh sách hóa đơn
        /// </summary>
        /// <returns></returns>
        public List<Import> GetImports()
        {
            ImportDL ImportDL = new ImportDL();
            List<Import> imports = ImportDL.GetImports();
            return imports;
        }
        public object GetImportsPaging(int pageNumber, string fromDate, string toDate)
        {
            ImportDL ImportDL = new ImportDL();
            ImportDL ImportDL2 = new ImportDL();
            List<Import> Imports = ImportDL.GetImportsPaging(pageNumber, fromDate, toDate);
            int totalRow = ImportDL2.GetTotalImportRow(fromDate, toDate);
            object obj = new { data = Imports, totalRow = totalRow };
            return obj;
        }

        public List<Import> GetImportsByDate(string today)
        {
            ImportDL ImportDL = new ImportDL();
            List<Import> imports = ImportDL.GetImportsByDate(today);
            return imports;
        }
        public List<Import> GetImportStatistical(int type, int value)
        {
            ImportDL importDL = new ImportDL();
            List<Import> imps;
            imps = importDL.GetImportStatistical(type, value);
            return imps;
        }

        /// <summary>
        /// Lưu hóa đơn
        /// </summary>
        /// <param name="import"></param>
        public void SaveImport(Import import)
        {
            ImportDL ImportDL = new ImportDL();
            ImportDL.SaveImport(import);
        }

        public void EditImport(Import import)
        {
            ImportDL ImportDL = new ImportDL();
            ImportDL.EditImport(import);
        }
        public Import GetImportByID(Guid id)
        {
            ImportDL ImportDL = new ImportDL();
            return ImportDL.GetImport(id);
        }
        public void DeleteImport(Guid id)
        {
            ImportDL ImportDL = new ImportDL();
            ImportDL.DeleteImport(id);
        }
        public int GetTotalImportRow(string fromDate, string toDate)
        {
            ImportDL ImportDL = new ImportDL();
            return ImportDL.GetTotalImportRow(fromDate, toDate);
        }


    }
}
