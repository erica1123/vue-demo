import Vue from 'vue'
import VueRouter from 'vue-router'
// 官方元件

import Home from '@/components/HelloWorld'
import Page from '@/components/page'
import Todolist from '@/components/todo'
import TableSort from '@/components/sort'
// 自訂的分頁元件

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
        {
            name: '首頁',      // 元件呈現的名稱
            path: '/index',   // 對應的虛擬路徑
            component: Home,   // 對應的元件
        },{
            name: '單元作業',
            path: '/page',
            component: Page,
            children: [
                {
                    name: 'todo',
                    path: '/page/todo',
                    component: Todolist
                },
                {
                    name: 'sort',
                    path: '/page/sort',
                    component: TableSort
                }
            ]
        }
        
    ]
})