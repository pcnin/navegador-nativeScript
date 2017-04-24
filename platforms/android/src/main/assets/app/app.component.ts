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
            if( args.url.indexOf( 'besgam.com' ) == -1 )
            {
                utilityModule.openUrl(args.url);
                webview.stopLoading();
            }
            else if( args.url.indexOf( 'redirect' ) != -1 )
            {
                utilityModule.openUrl(args.url);
                webview.stopLoading();
            }
        });
    }

    loadPage()
    {
        let textField:TextField = this.page.getViewById<TextField>("urlField");

        if(this.url.substring(0, 4) === 'http')
        {
            this.webviewsrc = this.url;
            textField.dismissSoftInput();
        }
        else
        {
            alert("Please, add `http://` or `https://` in front of the URL string");
        }

    }

    goBack()
    {
        let webview:WebView = this.page.getViewById<WebView>("wv");
        if(webview.canGoBack)
        {
            webview.goBack();
        }
    }

    submit(args:string)
    {
        let textField:TextField = this.page.getViewById<TextField>("urlField");

        if(args.substring(0, 4) === 'http')
        {
            this.webviewsrc = args;
            textField.dismissSoftInput();
        }
        else
        {
            alert("Please, add `http://` or `https://` in front of the URL string");
        }
    }

}
// << setting-url-webview