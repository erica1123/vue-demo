<template>
  <div class="page">
    <nav class="navbar navbar-expand-lg navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/page/todo">TodoList</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/page/sort">表格排序</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
    }
  }
}
</script>

