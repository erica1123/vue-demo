<template>
  <div>
    <div class="card"  v-for="(item, index) in filterData" :key="index">
      <div class="card-header">{{ item.County }} - {{ item.SiteName }}</div>
      <div class="card-body">
        <ul class="list-unstyled">
          <li>AQI 指數: {{ item.AQI }}</li>
          <li>PM2.5: {{ item['PM2.5'] }}</li>
          <li>說明: {{ item.Status }}</li>
        </ul>
        {{ item.PublishTime }}
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  name: 'card',
  components: {
  },
  data () {
    return {
        data: [],
        filter: ''
    }
  },
  created (){
    let api = 'http://opendata2.epa.gov.tw/AQI.json'
    this.axios.get(api).then( res => {
        this.data.push(...res.data)
    })
  }
}
</script>

