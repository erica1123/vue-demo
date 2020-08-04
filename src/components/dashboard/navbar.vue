<template>
  <div class="navBar row">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap nav-link">
          {{ msg }}
        </li>
      </ul>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      data: [],
      status: JSON.parse(localStorage.getItem('status')),
      msg: '' || '狀態訊息',
    }
  },
  created (){
    const api = process.env.API_PATH
    const url = `${api}/api/${process.env.CUSTOM_PATH}/products/`
    this.axios.get( url ).then( res => {
      this.data.push(...res.data.products)
    })
    this.check()
    
  },
  methods: {
     check() {
      const vm = this
      const api = process.env.API_PATH;
      const url = `${api}/api/user/check`
      this.axios.post( url ).then( res => {
        if (res.data.success) {
          vm.msg = '登入中'
        } else {
          vm.msg = res.data.message
        }
      }).catch(err => {
        console.log(err)
      })
    },
    signout() {
      const api = process.env.API_PATH
      const url = `${api}/logout`
      const vm = this
      this.axios.post( url ).then( res => {
        if (res.data.success) {
          vm.$router.push('/login')
        }
      })
    }

  }
}
</script>

