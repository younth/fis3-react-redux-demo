// 入口文件
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import configureStore from './store/configureStore'

// 性能测试
import * as Perf from 'react-addons-perf'
window.Perf = Perf

import Utils from './util/util';

// 创建 Redux 的 store 对象
const store = configureStore()

// 获取 route 配置
import Router from './router'

const renderPage = function () {
    window.WMAppReady(function () {
        // 提前打开loading, 解决白页时间过长问题
        Utils.loading()
        // 打开上拉刷新
        // WMApp.page.openPageRefresh();
        // WMApp.entry.setPageAction('onPageRefresh', function () {
        //   setTimeout(function (){
        //       WMApp.page.hidePageRefresh();
        //   }, 400)
        // });
        render(
            <Provider store={store}>
                <Router history={hashHistory}/>
            </Provider>,
            document.getElementById('root')
        )
    })
}

renderPage();
// debug模式 url: debug=1 方便线上在浏览器打开调试
if(Utils.getCurrentParam('debug') || !window.isWMApp) {
    require.async('./util/page.js', function () {
        renderPage();
    });
}

