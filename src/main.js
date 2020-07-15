// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' // 主要 AJAX 套件
import VueAxios from 'vue-axios' // 將它轉為 Vue 的套件
import 'bootstrap'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { dom } from '@fortawesome/fontawesome-svg-core'

library.add(faAngleUp, fasStar, farStar)
Vue.component('font-awesome-icon', FontAwesomeIcon)
dom.watch()

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
// axios.defaults.withCredentials = true
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

router.beforeEach( (to, from, next) => {
  // console.log( 'to', to, 'from', from, 'next', next)
  if( to.meta.requireAuth ) {
    
    let api = process.env.API_PATH
    let url = `${api}/api/user/check`

    axios.post( url ).then( res => {
      if (res.data.success) {
        next()
        // console.log(res)
      } else {
        console.log('需登入')
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
  
})