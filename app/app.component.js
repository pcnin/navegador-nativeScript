"use strict";
var core_1 = require("@angular/core");
var web_view_1 = require("ui/web-view");
var page_1 = require("ui/page");
var utilityModule = require("utils/utils");
var AppComponent = (function () {
    function AppComponent(page) {
        this.page = page;
        this.url = "http://www.besgam.com";
        this.webviewsrc = "http://www.besgam.com";
    }
    AppComponent.prototype.ngOnInit = function () {
        var webview = this.page.getViewById("wv");
        // webview.on(WebView.loadFinishedEvent, function (args: LoadEventData)
        // {
        //     if( args.url.indexOf( 'besgam.com' ) == -1 )
        //     {
        //         webview.goBack();
        //     }
        // });
        webview.on(web_view_1.WebView.loadStartedEvent, function (args) {
            /* Si la navegación no es dentro de besgam.com */
            if (args.url.indexOf('besgam.com') == -1) {
                /* Excepción para los captcha */
                if (args.url.indexOf('https://www.google.com/recaptcha/api2/') == -1) {
                    utilityModule.openUrl(args.url);
                    webview.stopLoading();
                }
            }
            else if (args.url.indexOf('redirect') != -1) {
                utilityModule.openUrl(args.url);
                webview.stopLoading();
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'basic-web-view-component',
            templateUrl: 'app.component.html'
        }), 
        __metadata('design:paramtypes', [page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
// << setting-url-webview 
//# sourceMappingURL=app.component.js.map