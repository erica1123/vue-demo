import Vue from 'vue'
import VueRouter from 'vue-router'
// 官方元件

import Home from '@/components/HelloWorld'
import Page from '@/components/pages/page'
import Todolist from '@/components/pages/todo'
import TableSort from '@/components/pages/sort'
import AQI from '@/components/pages/aqi'
// 自訂的分頁元件


Vue.use(VueRouter)
export default new VueRouter({
    linkActiveClass: 'active',
	routes: [
        {
            name: '首頁',      // 元件呈現的名稱
            path: '/',   // 對應的虛擬路徑
            component: Home,   // 對應的元件
        },{
            path: '/page',
            component: Page,
            children: [
                {
                    name: '待辦事項',
                    path: '',
                    component: Todolist
                },
                {
                    name: '表格排序',
                    path: 'sort',
                    component: TableSort
                }
            ]
        },{
            name: '空氣品質監控',
            path: '/aqi',
            component: AQI
        }
        
    ]
})