// 官方元件
import Vue from 'vue'
import VueRouter from 'vue-router'

// 自訂的分頁元件
import Index from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'

// 主選單
import Home from '@/components/main/home'
import Page from '@/components/main/page'
import AQI from '@/components/main/aqi'
import Login from '@/components/main/login'

// 次選單
import Todolist from '@/components/pages/todo'
import TableSort from '@/components/pages/sort'

// Dashboard
import Prod from '@/components/dashboard/prod'
import Order from '@/components/dashboard/order'


Vue.use(VueRouter)
export default new VueRouter({
    linkActiveClass: 'active',
	routes: [
        {
            path: '*',
            redirect: '/login'
        },{
            // name: '儀表板',
            path: '/admin',
            component: Dashboard,
            // meta: { requireAuth: true }, // 導航守衛
            children: [
                {
                    name: '產品頁',
                    path: '/admin/products',
                    component: Prod,
                    meta: { requireAuth: true }, // 導航守衛
                },
                {
                    name: '模擬訂單',
                    path: '/admin/order',
                    component: Order,
                }
            ]
        },{
            path: '/',
            component: Index,
            children: [
                {
                    name: '首頁',
                    path: '/',
                    component: Home,
                },{
                    path: '/page',
                    component: Page,
                    children: [
                        {
                            name: '待辦事項',
                            path: '',
                            component: Todolist
                        },{
                            name: '表格排序',
                            path: 'sort',
                            component: TableSort
                        }
                    ]
                },{
                    name: '空氣品質監控',
                    path: '/aqi',
                    component: AQI
                },{
                    name: '登入',
                    path: '/login',
                    component: Login
                },
            ]
        },
    ]
})