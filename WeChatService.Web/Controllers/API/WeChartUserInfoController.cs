using System.Web;
using Newtonsoft.Json;
using WeChatService.Library.Models;
using WeChatService.Library.Services;
using WeChatService.Web.Help;
using WeChatService.Web.Infrastructure;
using WeChatService.Web.Infrastructure.Filters;
using WeChatService.Web.Models.APIModel;

namespace WeChatService.Web.Controllers.API
{
    [CallApiAuthority]
    public class WeChartUserInfoController : BaseApiController
    {
        private readonly IAccountService _accountService;
        public WeChartUserInfoController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        public object Get()
        {
            var user = HttpContext.Current.User.Identity.GetUser();            
            var account = _accountService.GetAccount(user.Id);
            if (account != null)
            {
                //code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
                var code = HttpContext.Current.Request["code"];
                var openIdBackResult = GetOpenId(account, code);
                var model = GetWeChatUserUserInfo(openIdBackResult, openIdBackResult.openid);
                return model;
            }          
           
            return null;
        }
        private WeChatUserInfo GetWeChatUserUserInfo(OpenIdBackResult openIdBackResult, string openId)
        {
            var url = string.Format("https://api.weixin.qq.com/sns/userinfo?access_token={0}&openid={1}&lang=zh_CN", openIdBackResult.access_token, openId);
            return JsonConvert.DeserializeObject<WeChatUserInfo>(Tools.HttpGetUTF8(url));
        }
        private OpenIdBackResult GetOpenId(Account account,string Code)
        {
            var url = string.Format("https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type=authorization_code", account.AppId, account.AppSecret, Code);
            return JsonConvert.DeserializeObject<OpenIdBackResult>(Tools.HttpGetUTF8(url));
        }
    }
}
