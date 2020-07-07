<template>
  <div class="product">
    <div v-for="item in data" :key="item.id">
      <div class="alert alert-info">
        <h5>標題：{{ item.title }}</h5>
        <p>ID：{{ item.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
      data: []
    }
  },
  created (){
    let api = process.env.API_PATH
    let url = `${api}/api/${process.env.CUSTOM_PATH}/products/`

    this.axios.get( url ).then( res => {
      this.data.push(...res.data.products)
    })
    
  },
}
</script>
