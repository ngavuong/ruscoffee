using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using RusCoffee.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Web;

namespace RusCoffee.BL
{
    public class CommonFunction
    {
        private readonly string Secret = "zvy4muqavikgzro07sg7d4phmfoyit1ameaxoou57pa8leynnmr6ejx1j434ret2-vtnga";
        //private string _token { get; set; }
        //public void SetToken(string token)
        //{
        //    _token = token;
        //}
        //public User GetUserInfo()
        //{
        //    try
        //    {
        //        //HttpContext.Session.SetString("JWToken1", "1");
        //        var _token = System.Web.HttpContext.Current.Application["JWToken"];
        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var jwtToken = tokenHandler.ReadToken(_token) as JwtSecurityToken;

        //        if (jwtToken == null)
        //            return null;

        //        var symmetricKey = Encoding.UTF8.GetBytes(Secret);

        //        var validationParameters = new TokenValidationParameters()
        //        {
        //            RequireExpirationTime = true,
        //            ValidateIssuer = false,
        //            ValidateAudience = false,
        //            IssuerSigningKey = new SymmetricSecurityKey(symmetricKey)
        //        };

        //        SecurityToken securityToken;
        //        var principal = tokenHandler.ValidateToken(_token, validationParameters, out securityToken);
        //        User user = new User();
        //        foreach (var claim in principal.Claims)
        //        {
        //            switch (claim.Type)
        //            {
        //                case "Id":
        //                    user.Id = Guid.Parse(claim.Value);
        //                    break;
        //                case "FullName":
        //                    user.FullName = claim.Value;
        //                    break;
        //                case "RoleType":
        //                    user.RoleType = Int32.Parse(claim.Value);
        //                    break;
        //                case "UserCode":
        //                    user.UserCode = claim.Value;
        //                    break;
        //            }
        //        }
        //        return user;
        //    }

        //    catch (Exception e)
        //    {
        //        //should write log
        //        return null;
        //    }
        //}
    }
}
