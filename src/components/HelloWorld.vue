<template>
  <div class="hello">
    <div class="container my-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact>首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/page">單元作業</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/aqi">空氣品質指標</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/product">產品頁</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/login">登入頁</router-link>
          </li>
        </ul>
      </nav>
      <router-view class="my-3"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
}
</script>
<style lang="sass">
img
  width: 100%
  height: auto
  
</style>
