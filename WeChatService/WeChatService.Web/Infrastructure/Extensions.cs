﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Identity;
using WeChatService.Library.Models;
using WeChatService.Library.Services;
using WeChatService.Service;
using WeChatService.Service.Services;
using WeChatService.Web.Models;
using WeChatService.Library.Models;

namespace WeChatService.Web.Infrastructure
{
    public static class Extensions
    {
        public static UserModel GetUser(this IIdentity identity)
        {
           
            try
            {
                var customIdentity = identity as CustomIdentity;
                Account user = null;
                if (customIdentity == null)
                {
                    var _identity = identity as ClaimsIdentity;

                    if (_identity != null)
                    {
                        var userId = _identity.Claims.Where(n => n.Type == "Id").Select(n => n.Value).FirstOrDefault();
                        if (userId != null)
                        {
                            user = new AccountService(new WeChatServiceDataContext()).GetAccount(new Guid(userId));
                        }
                    }
                }
                else
                {
                    user = customIdentity.User;
                }

                Mapper.Reset();
                Mapper.CreateMap<QQInfo, QQInfoModel>();
                Mapper.CreateMap<Company, CompanyModel>()
                    .ForMember(n => n.CityId, opt => opt.MapFrom(src => src.City.Id));
                Mapper.CreateMap<Account, UserModel>()
                    .ForMember(n => n.CompanyModel, opt => opt.MapFrom(src => src.Company))
                    .ForMember(n => n.QQInfoModel, opt => opt.MapFrom(src => src.QQInfo));
                return Mapper.Map<Account, UserModel>(user);
            }
            catch (Exception ex)
            {
                //this.GetLogger().Error(ex.Message);
            }
            return null;
        }

        public static string Shorten(this String title)
        {
            if (title.Length > 12)
            {
                return title.Substring(0, 10) + "...";
            }
            else
            {
                return title;
            }
        }
    }
}
