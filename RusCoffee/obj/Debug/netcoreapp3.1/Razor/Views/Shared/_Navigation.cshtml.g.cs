#pragma checksum "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e1e7d76382b9e9e2073eac215e3855e1f9b9db8b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__Navigation), @"mvc.1.0.view", @"/Views/Shared/_Navigation.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\_ViewImports.cshtml"
using ASPNET_Core_2_1;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
using RusCoffee.BL;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
using Microsoft.AspNetCore.Http;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e1e7d76382b9e9e2073eac215e3855e1f9b9db8b", @"/Views/Shared/_Navigation.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bf3ab1a3ff43760fcc2127914d0c3d050c712654", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__Navigation : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/Scripts/libraries/jquery-3.4.1.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/Scripts/base/ajax.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/Scripts/views/Navigation.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 4 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
  
    var token = Context.Session.GetString("JWToken");
    var user = CommonFn.GetUserInfo(token);

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<nav class=\"navbar-default navbar-static-side\" role=\"navigation\">\r\n    <div class=\"sidebar-collapse\">\r\n        <ul class=\"nav metismenu\" id=\"side-menu\">\r\n            <li class=\"nav-header\">\r\n                <div class=\"dropdown profile-element\">\r\n");
            WriteLiteral("                    <a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\">\r\n                        <span class=\"block m-t-xs font-bold\" id=\"fullName\">");
#nullable restore
#line 16 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
                                                                      Write(user.FullName);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu animated fadeInRight m-t-xs\" style=\"position: absolute; top: 91px; left: 0px; will-change: top, left;\">\r\n                        <li>");
            WriteLiteral("</li>\r\n                        <li><a class=\"dropdown-item\"");
            BeginWriteAttribute("href", " href=\"", 1055, "\"", 1103, 1);
#nullable restore
#line 20 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 1062, Url.Action("ChangePassword", "AppViews"), 1062, 41, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("> Đổi mật khẩu</a></li>\r\n                        <li class=\"dropdown-divider\"></li>\r\n                        <li><a");
            BeginWriteAttribute("href", " href=\"", 1219, "\"", 1255, 1);
#nullable restore
#line 22 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 1226, Url.Action("Logout", "Home"), 1226, 29, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" class=\"dropdown-item logOutBtn\">Logout</a></li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"logo-element\">\r\n                    IN+\r\n                </div>\r\n            </li>\r\n");
#nullable restore
#line 29 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
             if (user.RoleType == 1)
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <li");
            BeginWriteAttribute("class", " class=\"", 1541, "\"", 1591, 1);
#nullable restore
#line 31 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 1549, Html.IsSelected(controller: "Dashboards"), 1549, 42, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 1617, "\"", 1662, 1);
#nullable restore
#line 32 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 1624, Url.Action("Dashboard", "Dashboards"), 1624, 38, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-area-chart\"></i> <span class=\"nav-label\">Thống kê doanh số</span> </a>\r\n                </li>\r\n                <li");
            BeginWriteAttribute("class", " class=\"", 1794, "\"", 1840, 1);
#nullable restore
#line 34 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 1802, Html.IsSelected(controller: "Tables"), 1802, 38, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 1866, "\"", 1906, 1);
#nullable restore
#line 35 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 1873, Url.Action("ItemList", "Tables"), 1873, 33, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-bars\"></i> <span class=\"nav-label\">Quản lý món</span> </a>\r\n                </li>\r\n                <li");
            BeginWriteAttribute("class", " class=\"", 2026, "\"", 2072, 1);
#nullable restore
#line 37 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2034, Html.IsSelected(controller: "Tables"), 2034, 38, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 2098, "\"", 2142, 1);
#nullable restore
#line 38 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2105, Url.Action("EmployeeList", "Tables"), 2105, 37, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-address-book\"></i> <span class=\"nav-label\">Danh sách nhân viên</span> </a>\r\n                </li>\r\n");
            WriteLiteral("                <li");
            BeginWriteAttribute("class", " class=\"", 2280, "\"", 2326, 1);
#nullable restore
#line 41 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2288, Html.IsSelected(controller: "Tables"), 2288, 38, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 2352, "\"", 2395, 1);
#nullable restore
#line 42 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2359, Url.Action("OrderMenu", "AppViews"), 2359, 36, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-shopping-cart\"></i> <span class=\"nav-label\">Đặt món</span> </a>\r\n                </li>\r\n                <li");
            BeginWriteAttribute("class", " class=\"", 2520, "\"", 2566, 1);
#nullable restore
#line 44 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2528, Html.IsSelected(controller: "Tables"), 2528, 38, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 2592, "\"", 2635, 1);
#nullable restore
#line 45 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2599, Url.Action("InvoiceList", "Tables"), 2599, 36, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-pie-chart\"></i> <span class=\"nav-label\">Danh sách hóa đơn</span> </a>\r\n                </li>\r\n                <li");
            BeginWriteAttribute("class", " class=\"", 2766, "\"", 2812, 1);
#nullable restore
#line 47 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2774, Html.IsSelected(controller: "Tables"), 2774, 38, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 2838, "\"", 2882, 1);
#nullable restore
#line 48 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 2845, Url.Action("MaterialList", "Tables"), 2845, 37, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-sign-in\"></i> <span class=\"nav-label\">Nhập kho</span> </a>\r\n                </li>\r\n");
#nullable restore
#line 52 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
                           
            }
            else
            {

#line default
#line hidden
#nullable disable
            WriteLiteral("                <li");
            BeginWriteAttribute("class", " class=\"", 3308, "\"", 3356, 1);
#nullable restore
#line 56 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 3316, Html.IsSelected(controller: "AppViews"), 3316, 40, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 3382, "\"", 3425, 1);
#nullable restore
#line 57 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 3389, Url.Action("OrderMenu", "AppViews"), 3389, 36, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-shopping-cart\"></i> <span class=\"nav-label\" data-i18n=\"nav.metrics\">Đặt món</span> </a>\r\n                </li>\r\n                <li");
            BeginWriteAttribute("class", " class=\"", 3574, "\"", 3620, 1);
#nullable restore
#line 59 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 3582, Html.IsSelected(controller: "Tables"), 3582, 38, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">\r\n                    <a");
            BeginWriteAttribute("href", " href=\"", 3646, "\"", 3690, 1);
#nullable restore
#line 60 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
WriteAttributeValue("", 3653, Url.Action("MaterialList", "Tables"), 3653, 37, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("><i class=\"fa fa-sign-in\"></i> <span class=\"nav-label\" data-i18n=\"nav.metrics\">Nhập kho</span> </a>\r\n                </li>\r\n");
#nullable restore
#line 62 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\RusCoffee\Views\Shared\_Navigation.cshtml"
            }

#line default
#line hidden
#nullable disable
            WriteLiteral("        </ul>\r\n    </div>\r\n</nav>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e1e7d76382b9e9e2073eac215e3855e1f9b9db8b15374", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e1e7d76382b9e9e2073eac215e3855e1f9b9db8b16414", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e1e7d76382b9e9e2073eac215e3855e1f9b9db8b17454", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
