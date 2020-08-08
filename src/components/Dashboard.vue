<template>
  <div class="dashboard">
    <Navbar/>
    <Alert/>
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
import Alert from './AlertMessage'

export default {
    name: 'Dashboard',
    components: {
      Navbar,
      Sidebar,
      Alert,
    },
    data () {
      return {}
    }
}
</script>