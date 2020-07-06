#pragma checksum "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\ASPNET_Core_2_1\Views\Miscellaneous\PdfViewer.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "017793767c123ebf91204beaf33a948102728ab7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Miscellaneous_PdfViewer), @"mvc.1.0.view", @"/Views/Miscellaneous/PdfViewer.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Miscellaneous/PdfViewer.cshtml", typeof(AspNetCore.Views_Miscellaneous_PdfViewer))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"017793767c123ebf91204beaf33a948102728ab7", @"/Views/Miscellaneous/PdfViewer.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bf3ab1a3ff43760fcc2127914d0c3d050c712654", @"/Views/_ViewImports.cshtml")]
    public class Views_Miscellaneous_PdfViewer : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/pdfjs/pdf.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("names", "Development,Staging,Production", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 2 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\ASPNET_Core_2_1\Views\Miscellaneous\PdfViewer.cshtml"
  
    ViewData["Title"] = "PDF viewer";

#line default
#line hidden
            BeginContext(44, 211, true);
            WriteLiteral("\n\n<div class=\"row wrapper border-bottom white-bg page-heading\">\n    <div class=\"col-lg-10\">\n        <h2>PDF viewer</h2>\n        <ol class=\"breadcrumb\">\n            <li class=\"breadcrumb-item\">\n                <a");
            EndContext();
            BeginWriteAttribute("href", " href=\"", 255, "\"", 302, 1);
#line 12 "D:\RusCoffee\ASPNET_Core_2_1_Full_Project\ASPNET_Core_2_1\Views\Miscellaneous\PdfViewer.cshtml"
WriteAttributeValue("", 262, Url.Action("Dashboard_1", "Dashboards"), 262, 40, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(303, 2545, true);
            WriteLiteral(@">Home</a>
            </li>
            <li class=""breadcrumb-item"">
                <a>Forms</a>
            </li>
            <li class=""active breadcrumb-item"">
                <strong>PDF viewer</strong>
            </li>
        </ol>
    </div>
    <div class=""col-lg-2"">
    </div>
</div>

<div class=""wrapper wrapper-content animated fadeIn"">
    <div class=""row"">
        <div class=""col-lg-12"">
            <div class=""ibox"">
                <div class=""ibox-content border-sbottom"">
                    <h4>PDF.js</h4>
                    <p>
                        PDF.js is a Portable Document Format (PDF) viewer that is built with HTML5.
                        PDF.js is community-driven and supported by Mozilla Labs. The goal is to create a general-purpose, web standards-based platform for parsing and rendering PDFs.
                        Full documentation: <a href=""https://github.com/mozilla/pdf.js"" target=""_blank"">https://github.com/mozilla/pdf.js</a>
                    </p>
                </d");
            WriteLiteral(@"iv>
            </div>
        </div>
    </div>
    <div class=""text-center pdf-toolbar"">
        <div class=""btn-group"">
            <button id=""prev"" class=""btn btn-white""><i class=""fa fa-long-arrow-left""></i> <span class=""hidden-xs"">Previous</span></button>
            <button id=""next"" class=""btn btn-white""><i class=""fa fa-long-arrow-right""></i> <span class=""hidden-xs"">Next</span></button>
            <button id=""zoomin"" class=""btn btn-white""><i class=""fa fa-search-minus""></i> <span class=""hidden-xs"">Zoom In</span></button>
            <button id=""zoomout"" class=""btn btn-white""><i class=""fa fa-search-plus""></i> <span class=""hidden-xs"">Zoom Out</span> </button>
            <button id=""zoomfit"" class=""btn btn-white""> 100%</button>
            <span class=""btn btn-white hidden-xs"">Page: </span>
            <div class=""input-group"">
                <input type=""text"" class=""form-control"" id=""page_num"">
                <div class=""input-group-btn"">
                    <button type=""button"" class=""btn btn-whit");
            WriteLiteral(@"e"" id=""page_count"">/ 22</button>
                </div>
            </div>
        </div>
    </div>



    <div class=""text-center m-t-md"">
        <canvas id=""the-canvas"" class=""pdfcanvas border-left-right border-top-bottom b-r-md""></canvas>
    </div>
    <div class=""footer"">
        <div class=""float-right"">
            10GB of <strong>250GB</strong> Free.
        </div>
        <div>
            <strong>Copyright</strong> Example Company &copy; 2014-2015
        </div>
    </div>
</div>
");
            EndContext();
            DefineSection("Scripts", async() => {
                BeginContext(2866, 5, true);
                WriteLiteral("\n    ");
                EndContext();
                BeginContext(2871, 122, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("environment", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "43169e2af89e4ddeab67aa263f3011d4", async() => {
                    BeginContext(2923, 9, true);
                    WriteLiteral("\n        ");
                    EndContext();
                    BeginContext(2932, 42, false);
                    __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "5646874b12ae4adfa26dc4174ad1aec8", async() => {
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
                    EndContext();
                    BeginContext(2974, 5, true);
                    WriteLiteral("\n    ");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper.Names = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(2993, 4563, true);
                WriteLiteral(@"

    <script type=""text/javascript"">
        //
        // If absolute URL from the remote server is provided, configure the CORS
        // header on that server.
        //
        var url = '../pdf/example.pdf';


        var pdfDoc = null,
                pageNum = 1,
                pageRendering = false,
                pageNumPending = null,
                scale = 1.5,
                zoomRange = 0.25,
                canvas = document.getElementById('the-canvas'),
                ctx = canvas.getContext('2d');

        /**
         * Get page info from document, resize canvas accordingly, and render page.
         */
        function renderPage(num, scale) {
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function (page) {
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
   ");
                WriteLiteral(@"             var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);

                // Wait for rendering to finish
                renderTask.promise.then(function () {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        // New page rendering is pending
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            // Update page counters
            document.getElementById('page_num').value = num;
        }

        /**
         * If another page rendering in progress, waits until the rendering is
         * finised. Otherwise, executes rendering immediately.
         */
        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
            ");
                WriteLiteral(@"    renderPage(num, scale);
            }
        }

        /**
         * Displays previous page.
         */
        function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            var scale = pdfDoc.scale;
            queueRenderPage(pageNum, scale);
        }
        document.getElementById('prev').addEventListener('click', onPrevPage);

        /**
         * Displays next page.
         */
        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            var scale = pdfDoc.scale;
            queueRenderPage(pageNum, scale);
        }
        document.getElementById('next').addEventListener('click', onNextPage);

        /**
         * Zoom in page.
         */
        function onZoomIn() {
            if (scale >= pdfDoc.scale) {
                return;
            }
            scale += zoomRange;
            var num = pageNum;
            renderPage(num");
                WriteLiteral(@", scale)
        }
        document.getElementById('zoomin').addEventListener('click', onZoomIn);

        /**
         * Zoom out page.
         */
        function onZoomOut() {
            if (scale >= pdfDoc.scale) {
                return;
            }
            scale -= zoomRange;
            var num = pageNum;
            queueRenderPage(num, scale);
        }
        document.getElementById('zoomout').addEventListener('click', onZoomOut);

        /**
         * Zoom fit page.
         */
        function onZoomFit() {
            if (scale >= pdfDoc.scale) {
                return;
            }
            scale = 1;
            var num = pageNum;
            queueRenderPage(num, scale);
        }
        document.getElementById('zoomfit').addEventListener('click', onZoomFit);


        /**
         * Asynchronously downloads PDF.
         */
        PDFJS.getDocument(url).then(function (pdfDoc_) {
            pdfDoc = pdfDoc_;
            var documentPagesNumber = pdfDoc.numPages;
            do");
                WriteLiteral(@"cument.getElementById('page_count').textContent = '/ ' + documentPagesNumber;

            $('#page_num').on('change', function () {
                var pageNumber = Number($(this).val());

                if (pageNumber > 0 && pageNumber <= documentPagesNumber) {
                    queueRenderPage(pageNumber, scale);
                }

            });

            // Initial/first page rendering
            renderPage(pageNum, scale);
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
