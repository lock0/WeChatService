using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WeChatService.Web.Help
{
    public static class Tools
    {
        public static string SHA1_Hash(string strSha1In)
        {
            var sha1 = new SHA1CryptoServiceProvider();
            var bytesSha1In = System.Text.Encoding.Default.GetBytes(strSha1In);
            var bytesSha1Out = sha1.ComputeHash(bytesSha1In);
            var strSha1Out = BitConverter.ToString(bytesSha1Out);
            strSha1Out = strSha1Out.Replace("-", "").ToLower();
            return strSha1Out;
        }
        //创建随机字符串  
        public static string CreateNonceStr()
        {
            const int length = 16;
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var str = string.Empty;
            var rad = new Random();
            for (var i = 0; i < length; i++)
            {
                str += chars.Substring(rad.Next(0, chars.Length - 1), 1);
            }
            return str;
        }

        public static string HttpGet(string url)
        {
            try
            {
                var myWebClient = new WebClient {Credentials = CredentialCache.DefaultCredentials};
                var pageData = myWebClient.DownloadData(url); //从指定网站下载数据  
                var pageHtml = System.Text.Encoding.Default.GetString(pageData); //如果获取网站页面采用的是GB2312，则使用这句
                return pageHtml;
            }

            catch (WebException webEx)
            {
                return webEx.Message;
            }
        }
        public static string HttpGetUTF8(string url)
        {
            try
            {
                var myWebClient = new WebClient { Credentials = CredentialCache.DefaultCredentials };
                var pageData = myWebClient.DownloadData(url); //从指定网站下载数据  
                var pageHtml = System.Text.Encoding.UTF8.GetString(pageData); //如果获取网站页面采用的是GB2312，则使用这句
                return pageHtml;
            }

            catch (WebException webEx)
            {
                return webEx.Message;
            }
        }
    }
}
