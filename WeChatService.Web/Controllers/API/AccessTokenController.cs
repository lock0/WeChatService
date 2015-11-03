using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WeChatService.Library.Services;
using WeChatService.Web.Infrastructure;
using WeChatService.Web.Infrastructure.Filters;

namespace WeChatService.Web.Controllers.API
{
    [CallApiAuthority]
    public class AccessTokenController : BaseApiController
    {
        private readonly IAccountService _accountService;

        public AccessTokenController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        public object Get()
        {
            var user = HttpContext.Current.User.Identity.GetUser();
            var account = _accountService.GetAccount(user.Id);
            return account.AccessToken;
        }
    }
}
