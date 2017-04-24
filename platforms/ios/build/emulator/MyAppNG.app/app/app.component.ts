import {Component, OnInit} from "@angular/core";
import {WebView, LoadEventData} from "ui/web-view";
import {Page} from "ui/page";
import {TextField} from "ui/text-field"

var utilityModule = require("utils/utils");

@Component({
    selector: 'basic-web-view-component',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit
{
    public url="http://www.besgam.com";
    public webviewsrc="http://www.besgam.com";

    constructor(private page: Page) {}

    ngOnInit()
    {
        let webview:WebView = this.page.getViewById<WebView>("wv");

        // webview.on(WebView.loadFinishedEvent, function (args: LoadEventData)
        // {
        //     if( args.url.indexOf( 'besgam.com' ) == -1 )
        //     {
        //         webview.goBack();
        //     }
        // });

        webview.on(WebView.loadStartedEvent, function( args: LoadEventData)
        {
            /* Si la navegación no es dentro de besgam.com */
            if( args.url.indexOf( 'besgam.com' ) == -1 )
            {
                /* Excepción para los captcha */
                if( args.url.indexOf( 'https://www.google.com/recaptcha/api2/') == -1 )
                {
                    utilityModule.openUrl(args.url);
                    webview.stopLoading();
                }
            }
            /* Si esta dentro de besgam */
            else if( args.url.indexOf( 'redirect' ) != -1 )
            {
                utilityModule.openUrl(args.url);
                webview.stopLoading();
            }
        });
    }
}
// << setting-url-webview