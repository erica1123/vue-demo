<template>
  <div class="hello">
    <div v-for="(item, index) in data" :key="index">
      <img :src="item" alt="">
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: []
    }
  },
  created (){
    let cors = 'https://cors-anywhere.herokuapp.com/'
    let clientID = 'L39YcRzMRt9ZweiuAsM7Pjq_jiY-N_PE5KMvlnV1sS0'
    let api = 'https://api.unsplash.com/search/photos'
    let url = api + '?query=cats' + '&client_id=' + clientID

    this.axios.get(url).then( res => {
        this.data.push(res.data.results[6].urls.regular)
        console.log(res)
    }).catch( err => {
      console.log(err)
    })
  },
}
</script>
<style lang="sass">
img
  width: 100%
  height: auto
  
</style>
