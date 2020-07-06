
using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace RusCoffee.DL
{
    public class ItemDL : BaseDL
    {

        public List<Item> GetItems()
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetItems]";
                List<Item> items = GetData<Item>(sqlCommand);
                return items;
            }
        }

        public void SaveItem(Item item)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_InsertItem]";
                sqlCommand.Parameters.AddWithValue("@ItemName", item.ItemName);
                sqlCommand.Parameters.AddWithValue("@UnitPrice", item.UnitPrice);
                sqlCommand.Parameters.AddWithValue("@ItemStatus", item.ItemStatus);
                sqlCommand.Parameters.AddWithValue("@UnitName", item.UnitName);
                sqlCommand.Parameters.AddWithValue("@ImagePath", item.ImagePath);
                sqlCommand.ExecuteNonQuery();
            }
        }

        public void DeleteItem(Guid itemID)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_DeleteItem]";
                sqlCommand.Parameters.AddWithValue("@ItemID", itemID);
                sqlCommand.ExecuteNonQuery();
            }
        }

        public void EditItem(Item item)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_EditItem]";
                sqlCommand.Parameters.AddWithValue("@ItemID", item.ItemID);
                sqlCommand.Parameters.AddWithValue("@ItemName", item.ItemName);
                sqlCommand.Parameters.AddWithValue("@UnitPrice", item.UnitPrice);
                sqlCommand.Parameters.AddWithValue("@ItemStatus", item.ItemStatus);
                sqlCommand.Parameters.AddWithValue("@UnitName", item.UnitName);
                sqlCommand.Parameters.AddWithValue("@ImagePath", item.ImagePath);

                sqlCommand.ExecuteNonQuery();
            }
        }

        public Item GetItemByID(Guid id)
        {
            using (dBContext)
            {
                var sqlCommand = dBContext.GetSqlCommand();
                sqlCommand.CommandText = "[dbo].[Proc_GetItems_ByID]";
                sqlCommand.Parameters.AddWithValue("@itemID", id);
                return GetData<Item>(sqlCommand).FirstOrDefault();
            }
        }
    }
}


