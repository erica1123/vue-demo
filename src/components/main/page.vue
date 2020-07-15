<template>
  <div class="page">
    <Navs/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navs from '../pages/navs'

export default {
  name: 'page',
  components: {
    Navs
  },
  data () {
    return {
    }
  }
}
</script>

