package com.example.uiwidgettest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.widget.Button;

import org.json.JSONObject;

public class WebView extends AppCompatActivity implements View.OnClickListener {

    String jsonData;
    android.webkit.WebView myWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

//        Button send_msg_to_js = findViewById(R.id.send_msg_to_js);
//        send_msg_to_js.setOnClickListener(this);

        /* 1.从本地读取 assets 下的 data.json 数据 */
        JSONObject jsonObject = ReadAssetsJsonUtil.getJSONObject("dist_canvas/data.json", WebView.this);
        String jsonData = jsonObject != null ? jsonObject.toString() : null;
        Log.d("jsonData", jsonData);

        /* 2.获取 WebView 控件*/
        myWebView = (android.webkit.WebView) findViewById(R.id.web_view);

        /* 3.开放Javascript对Java对象方法的调用权限 */
        myWebView.addJavascriptInterface(new JSCallManager(jsonData), "Native");

        myWebView.setWebChromeClient(new WebChromeClient() {}); //alert弹出框代码
        /* 4.配置 WebView.getSettings */
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);         //让webview可以支持js代码
//        webSettings.setUseWideViewPort(true);           //设置缩放后不会变形
//        webSettings.setBuiltInZoomControls(true);       //设置可以缩放
        /* 5.嵌入html */
        myWebView.setWebViewClient(new WebViewClient());
        myWebView.loadUrl("file:///android_asset/dist_canvas/index.html");
    }

    @Override
    public void onBackPressed() {
        myWebView.destroy();
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
//        sendInfoToJs();
        super.onDestroy();
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()){
//            case R.id.send_msg_to_js:
//                sendInfoToJs();
//                break;
            default:
                break;
        }
    }

    //在java中调用javascript方法
    public void sendInfoToJs() {
        String msg = "999";
        //调用js中的函数：showInfoFromJava(msg)
        myWebView.loadUrl("javascript:showInfoFromJava('" + msg + "')");
    }
}
