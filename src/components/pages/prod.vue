<template>
  <div class="product">
    <div v-for="item in data" :key="item.id">
      <div class="alert alert-info">
        <h5>標題：{{ item.title }}</h5>
        <p>ID：{{ item.id }}</p>
      </div>
    </div>
     <div class="form-signin text-center">
      <p class="alert alert-primary">{{ msg }}</p>
      <a href="#" @click.prevent="signout">登出</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
      data: [],
      status: JSON.parse(localStorage.getItem('status')),
      msg: ''
    }
  },
  created (){
    const api = process.env.API_PATH
    const url = `${api}/api/${process.env.CUSTOM_PATH}/products/`

    this.axios.get( url ).then( res => {
      this.data.push(...res.data.products)
    })

    this.msg = this.status
    
  },
  methods: {
    signout() {
      const api = process.env.API_PATH
      const url = `${api}/logout`
      const vm = this

      this.axios.post( url ).then( res => {
        if (res.data.success) {
          vm.$router.push('/login')
          vm.msg = '未登入'
          localStorage.setItem('status', JSON.stringify(vm.msg))
        }
      })
    }
  }
}
</script>
