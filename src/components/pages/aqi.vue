<template>
  <div class="aqi">
    <select class="form-control" v-model="filter">
        <option value=""> --- 請選擇城市 ---</option>
        <option v-for="(item, index) in filterCounty" :key="index" :value="item">
          {{ item }}
        </option>
    </select>

    <div class="alert alert-secondary my-3">關注城市</div>
    <div class="card-columns">
      <div class="card"
        v-for="(item, index) in staredData" 
        :key="index" 
        :class="statusClass(item)">
        <div class="card-header">
          {{ item.County }} - {{ item.SiteName }}
          <a class="float-right" href="#"
            @click.prevent="toggleStared(item.SiteName)">
            <i class="fas fa-star"></i>
          </a>
        </div>
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

    <hr>

    <div class="card-columns my-4">
      <div class="card"
        v-for="(item, index) in filterData" 
        :key="index"
        :class="statusClass(item)">
        <div class="card-header">
          {{ item.County }} - {{ item.SiteName }}
          <a class="float-right" href="#" 
            @click.prevent="toggleStared(item.SiteName)">
            <i class="far fa-star"></i>
          </a>
        </div>
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
  </div>
</template>


<script>
// import Card from './card'

export default {
  name: 'aqi',
  components: {
    // Card
  },
  data () {
    return {
      data: [],
      location: [],
      filter: '',
      stared: JSON.parse(localStorage.getItem('citys')) || []
    }
  },
  created (){
    let api = 'http://opendata2.epa.gov.tw/AQI.json'
    this.axios.get(api).then( res => {
        this.data.push(...res.data)
    })
  },
  methods: {
    addStared (){
      this.$emit('starevent', this.data.SiteName)
    },
    toggleStared (SiteName){
      let vm = this

      // 檢查 stared 陣列並回傳
			// 若陣列中的值符合 SiteName，回傳索引位置；若無則回傳 -1
      let index = vm.stared.findIndex(item => {
        if (item == SiteName) {
          return item
        }
      })

      // 如果值為 -1 則回傳至陣列
      if( index == -1 ) {
        vm.stared.push(SiteName)
      } else {
        vm.stared.splice(index, 1)
      }

      // 儲存到 LocalStorage
      localStorage.setItem('citys', JSON.stringify(this.stared))
      
      // console.log(index, SiteName, vm.stared)
    },
    statusClass (item){
			switch (item.Status) {
				case '良好':
				default:
					return ''
				case '普通':
					return 'status-aqi2'
				case '對敏感族群不健康':
					return 'status-aqi3'
				case '對所有族群不健康':
					return 'status-aqi4'
				case '非常不健康':
					return 'status-aqi5'
				case '危害':
					return 'status-aqi6'
			}
		}

  },
  computed: {
    filterCounty (){
      let vm = this
      // 取出 data 裡的城市資料
      vm.data.forEach(item => {
        vm.location.push(item.County)
      })
      // 過濾重複城市
      return vm.location.filter( (item, index, arr) => {
        if ( arr.indexOf(item) === index ) {
          return item
        }
      })
    },
    staredData (){
			var vm = this;
			// 顯示關注城市
			return vm.data.filter((item, index) => 
				vm.stared.includes(item.SiteName))
    },
    filterData (){
      var vm = this;
			
			// 先過濾包含 SiteName 的內容
      var result = vm.data.filter( (item, index) => {
				if ( !vm.stared.includes(item.SiteName) ) {
					return item
				}
			})
			
			// 取出選單相對應城市內容
      if( vm.filter !== '' ){ 
				return result.filter( item => {
					if ( vm.filter == item.County ) { return item }
				})
      }else {
        return result
      }
    }
  }
}
</script>

<style lang="sass">
.status-aqi2
	background-color: #ffeb54
.status-aqi3
	background-color: #ff7e00
.status-aqi4
	background-color: #ff0000
.status-aqi5
	background-color: #8f3f97
.status-aqi6
	background-color: #7e0023

.card-body
	line-height: 1.6
  
</style>

