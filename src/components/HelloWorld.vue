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
    let id = '812193ef71ca946e361ed541979a0cfd91e9419a19235fd05f51ea14233f020a'
    let api = 'https://api.unsplash.com/search/photos'
    let url = api + '?query=cats' + '&client_id=' + clientID

    this.axios.get(url).then( res => {
        this.data.push(res.data.results[5].urls.regular)
        // console.log(res)
    })
  },
}
</script>
<style lang="sass">
img
  width: 100%
  height: auto
  
</style>
