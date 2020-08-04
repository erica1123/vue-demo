<template>
  <div class="login">
    <form class="form-signin" @submit.prevent="signin" @keyup.enter="signin">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="user.username" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="user.password" id="inputPassword" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
    </form>
    <div class="form-signin text-center">
      <p class="alert alert-primary">{{ msg }}</p>
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: '' 
      },
      msg: '' || '狀態訊息',
    }
  },
  created (){
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
    signin() {
      const api = process.env.API_PATH
      const url = `${api}/admin/signin`
      const vm = this
  
      this.axios.post( url, vm.user ).then( res => {
        if (res.data.success) {
          vm.$router.push('/admin/products')
        }
      })
    },
    signout() {
      const api = process.env.API_PATH
      const url = `${api}/logout`
      const vm = this
      this.axios.post( url ).then( res => {
        console.log(res.data.message)
      })
    }
  },
}
</script>

<style lang="css" scope>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
} 
</style>