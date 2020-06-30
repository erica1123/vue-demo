<template>
  <div id="todo">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">待辦事項</span>
      </div>
      <input type="text" class="form-control" placeholder="準備要做的任務"    
        v-model="newTodo"
        @keyup.enter="addTodo">
      <div class="input-group-append">
        <button class="btn btn-primary"
          @click="addTodo">新增</button>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a href="" class="nav-link"
              :class="{'active': status == 'all'}"
              @click.prevent=" status = 'all' ">全部</a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link"
              :class="{'active': status == 'active'}"
              @click.prevent=" status = 'active' ">進行中</a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link"
              :class="{'active': status == 'completed'}"
              @click.prevent=" status = 'completed' ">已完成</a>
          </li>
        </ul>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"
          v-for="item in filterTodo"
          :key="item.id"
          @dblclick="editTodo(item)">
          <div class="d-flex" v-if="cacheTodo.id !== item.id">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" 
                :id="item.id"
                v-model="item.completed">
              <label class="form-check-label"
                :class="{ 'completed' : item.completed }"
                :for="item.id">{{ item.title }}</label>
            </div>
            <button class="close ml-auto" @click="removeTodo(item)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <input type="text" class="form-control"
            v-if="cacheTodo.id === item.id"
            v-model="cacheTitle"
            @keyup.enter="doneEdit(item)"
            @keyup.esc="cancelEdit">
        </li>
      </ul>
      <div class="card-footer d-flex justify-content-between">
        <span>還有 {{ activeTodo.length }} 筆任務未完成</span>
        <a href="#" @click="cleanTodo">清除所有任務</a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      todos: [{
        title: 'Default',
        id: 0,
        completed: false
      }],
      status: 'all',
      cacheTodo: [],
      cacheTitle: ''
    }
  },
  methods: {
    addTodo (){
      let value = this.newTodo.trim()
      let timeStamp = Math.floor(Date.now())
      if ( !value ){ return }
      this.todos.push({
        title: value,
        id: timeStamp,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo (todo){
      let newIndex = this.todos.findIndex( (item) => {
        return todo.id == item.id
      })
      this.todos.splice(newIndex, 1)
    },
    cleanTodo (){
      this.todos = []
    },
    editTodo (todo){
      this.cacheTodo = todo
      this.cacheTitle = todo.title
    },
    doneEdit (todo){
      todo.title = this.cacheTitle
      this.cacheTodo = []
      this.cacheTitle = ''
    },
    cancelEdit (){
      this.cacheTodo = []
    }
  },
  computed: {
    activeTodo (){
      return this.todos.filter( (todo) => {
        return !todo.completed
      })
    },
    completedTodo (){
      return this.todos.filter( (todo) => {
        return todo.completed
      })
    },
    filterTodo (){
      switch  (this.status) {
        case 'all':
          return this.todos
        case 'active':
          return this.activeTodo
        case 'completed':
          return this.completedTodo
      }
    }
  }
}
</script>
<style lang="sass">
  .completed
    text-decoration: line-through
</style>

