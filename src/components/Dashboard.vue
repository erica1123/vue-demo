<template>
  <div class="dashboard">
    <Navbar/>
    <Sidebar/>
    <div class="container-fluid">
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-4">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './dashboard/navbar'
import Sidebar from './dashboard/sidebar'

import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true

export default {
    name: 'Dashboard',
    components: {
      Navbar,
      Sidebar
    },
    data () {
      return {}
    }
}
</script>