package com.example.uiwidgettest;

import android.webkit.JavascriptInterface;

public class JSCallManager {
    private String data;
    public JSCallManager(String data) {
        this.data = data;
    }

    /**
     * getData
     * Javascript调用此方法获取数据
     * 方法将会绑定到window对象上
     * 使用方法: window.Native.getData()
     * @return
     */
    @JavascriptInterface
    public String getData() {
        return data;
    }
}