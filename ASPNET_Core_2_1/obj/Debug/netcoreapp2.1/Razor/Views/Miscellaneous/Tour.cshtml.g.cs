#pragma checksum "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\ASPNET_Core_2_1\Views\Miscellaneous\Tour.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1b67fe0b18ea728d402337cdc5e8c21c72448212"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Miscellaneous_Tour), @"mvc.1.0.view", @"/Views/Miscellaneous/Tour.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Miscellaneous/Tour.cshtml", typeof(AspNetCore.Views_Miscellaneous_Tour))]
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
#line 1 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\ASPNET_Core_2_1\Views\_ViewImports.cshtml"
using ASPNET_Core_2_1;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1b67fe0b18ea728d402337cdc5e8c21c72448212", @"/Views/Miscellaneous/Tour.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bf3ab1a3ff43760fcc2127914d0c3d050c712654", @"/Views/_ViewImports.cshtml")]
    public class Views_Miscellaneous_Tour : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/bootstrap-tour/build/css/bootstrap-tour.min.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("names", "Development,Staging,Production", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/bootstrap-tour/build/js/bootstrap-tour.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 1, true);
            WriteLiteral("\n");
            EndContext();
#line 2 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\ASPNET_Core_2_1\Views\Miscellaneous\Tour.cshtml"
  
    ViewData["Title"] = "Tour";

#line default
#line hidden
            BeginContext(38, 213, true);
            WriteLiteral("<div class=\"row wrapper border-bottom white-bg page-heading\">\n    <div class=\"col-lg-10\">\n        <h2>Bootstrap Tour</h2>\n        <ol class=\"breadcrumb\">\n            <li class=\"breadcrumb-item\">\n                <a");
            EndContext();
            BeginWriteAttribute("href", " href=\"", 251, "\"", 298, 1);
#line 10 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\ASPNET_Core_2_1\Views\Miscellaneous\Tour.cshtml"
WriteAttributeValue("", 258, Url.Action("Dashboard_1", "Dashboards"), 258, 40, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(299, 2665, true);
            WriteLiteral(@">Home</a>
            </li>
            <li class=""breadcrumb-item"">
                <a>Miscellaneous</a>
            </li>
            <li class=""active breadcrumb-item"">
                <strong>Bootstrap Tour</strong>
            </li>
        </ol>
    </div>
    <div class=""col-lg-2"">

    </div>
</div>

<div class=""wrapper wrapper-content  animated fadeInRight"">
    <div class=""row"">
        <div class=""col-md-6"">
            <div class=""ibox "">
                <div class=""ibox-title"">
                    <h5>Bootstrap Tour</h5>
                </div>

                <div class=""ibox-content"">
                    <p>
                        Quick and easy way to build your product tours with Bootstrap Popovers.
                    </p>

                    <div class="" m-t-sm"">

                        <a href=""#"" class=""btn btn-primary startTour""><i class=""fa fa-play""></i> Start Tour</a>

                    </div>
                </div>
            </div>
        </div>
        <div class=""col-md-6"">
");
            WriteLiteral(@"            <div class=""ibox "">
                <div class=""ibox-title"">
                    <h5>Tour steps</h5>
                </div>
                <div class=""ibox-content text-center"" id=""step1"">
                    <div class=""p-sm"">
                        <h3>Step 1</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""row"">
        <div class=""col-md-6"">
            <div class=""ibox "">
                <div class=""ibox-title"">
                    <h5>Tour steps</h5>
                </div>
                <div class=""ibox-content text-center"" id=""step2"">
                    <div class=""p-sm"">
                        <h3>Step 2</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class=""col-md-6"">
            <div class=""ibox "">
                <div class=""ibox-title"">
                    <h5>Tour steps</h5>
                </div>
                <div class=""ibox-content text-center"" id=""step3");
            WriteLiteral(@""">
                    <div class=""p-sm"">
                        <h3>Step 3</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""row"">
        <div class=""col-md-12"">
            <div class=""ibox "">
                <div class=""ibox-title"">
                    <h5>Tour steps</h5>
                </div>
                <div class=""ibox-content text-center"" id=""step4"">
                    <div class=""p-xl"">
                        <h3>Step 4</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>


");
            EndContext();
            DefineSection("Styles", async() => {
                BeginContext(2981, 5, true);
                WriteLiteral("\n    ");
                EndContext();
                BeginContext(2986, 166, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("environment", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8d36de80ae81427ea950e925db84fdd5", async() => {
                    BeginContext(3038, 9, true);
                    WriteLiteral("\n        ");
                    EndContext();
                    BeginContext(3047, 86, false);
                    __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "c1680645c6e247c2830afd28ad637cea", async() => {
                    }
                    );
                    __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                    __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                    await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                    if (!__tagHelperExecutionContext.Output.IsContentModified)
                    {
                        await __tagHelperExecutionContext.SetOutputContentAsync();
                    }
                    Write(__tagHelperExecutionContext.Output);
                    __tagHelperExecutionContext = __tagHelperScopeManager.End();
                    EndContext();
                    BeginContext(3133, 5, true);
                    WriteLiteral("\n    ");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper.Names = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(3152, 1, true);
                WriteLiteral("\n");
                EndContext();
            }
            );
            BeginContext(3155, 1, true);
            WriteLiteral("\n");
            EndContext();
            DefineSection("Scripts", async() => {
                BeginContext(3174, 5, true);
                WriteLiteral("\n    ");
                EndContext();
                BeginContext(3179, 155, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("environment", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6426554c751446d2a5717aa15d9e175e", async() => {
                    BeginContext(3231, 9, true);
                    WriteLiteral("\n        ");
                    EndContext();
                    BeginContext(3240, 75, false);
                    __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "d0241e42886e4283b2c61fe72fe367b1", async() => {
                    }
                    );
                    __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                    __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                    await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                    if (!__tagHelperExecutionContext.Output.IsContentModified)
                    {
                        await __tagHelperExecutionContext.SetOutputContentAsync();
                    }
                    Write(__tagHelperExecutionContext.Output);
                    __tagHelperExecutionContext = __tagHelperScopeManager.End();
                    EndContext();
                    BeginContext(3315, 5, true);
                    WriteLiteral("\n    ");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper.Names = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(3334, 1910, true);
                WriteLiteral(@"

    <script type=""text/javascript"">
        $(document).ready(function () {

            // Instance the tour
            var tour = new Tour({
                steps: [{

                    element: ""#step1"",
                    title: ""Title of my step"",
                    content: ""Introduce new users to your product by walking them through it step by step."",
                    placement: ""top""
                },
                    {
                        element: ""#step2"",
                        title: ""Title of my step"",
                        content: ""Content of my step"",
                        placement: ""top"",
                        backdrop: true,
                        backdropContainer: '#wrapper',
                        onShown: function (tour) {
                            $('body').addClass('tour-open')
                        },
                        onHidden: function (tour) {
                            $('body').removeClass('tour-close')
                        }
            ");
                WriteLiteral(@"        },
                    {
                        element: ""#step3"",
                        title: ""Title of my step"",
                        content: ""Introduce new users to your product by walking them through it step by step."",
                        placement: ""bottom""
                    },
                    {
                        element: ""#step4"",
                        title: ""Title of my step"",
                        content: ""Introduce new users to your product by walking them through it step by step."",
                        placement: ""top""
                    }
                ]
            });

            // Initialize the tour
            tour.init();

            $('.startTour').click(function () {
                tour.restart();

                // Start the tour
                // tour.start();
            })

        });

    </script>
");
                EndContext();
            }
            );
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
