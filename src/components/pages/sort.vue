<template>
  <div class="sort">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>品名</th>
          <th class="click" @click="
						sortItem = 'price', 
						isReverse = !isReverse">價格
            <span class="icon"
							:class="{ 'inverse': !isReverse }"
							v-if="sortItem == 'price'">
							<font-awesome-icon icon="angle-up" />
						</span>
          </th>
          <th class="click"
						@click=" sortItem = 'expiryDate', 
						isReverse = !isReverse">到期天數
            <span class="icon"
							:class="{ 'inverse': !isReverse }"
							v-if="sortItem == 'expiryDate'">
							<font-awesome-icon icon="angle-up" />
						</span>
          </th>
					<th>到期日</th>
        </tr>
        <tr v-for="(item, index) in sortData" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.expiryDate }}</td>
					<td>{{ addDays(item.expiryDate)}}</td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableSort",
  data() {
    return {
			sortItem: '',
			isReverse: true,
			data: [
      {
        name: '巧呼呼蘇打水',
        price: 30,
        expiryDate: 90
      },
      {
        name: '心驚膽跳羊肉飯',
        price: 65,
        expiryDate: 2
      },
      {
        name: '郭師傅武功麵包',
        price: 32,
        expiryDate: 1
      },
      {
        name: '不太會過期的新鮮牛奶',
        price: 75,
        expiryDate: 600
      },
      {
        name: '金殺 巧粒粒',
        price: 120,
        expiryDate: 200
      }
    	]
		}
  },
	methods: {
		dateTime (newDate){
			let year = newDate.getFullYear()
			let month = (newDate.getMonth()+1 < 10 ? '0' : '') + (newDate.getMonth()+1)
			let date = (newDate.getDate() < 10 ? '0' : '') + (newDate.getDate())
			return `${year}.${month}.${date}`
		},
		addDays (days){
			let addDay = days * 86400000
			let nowDay = Date.now()
			let expDate = new Date(nowDay + addDay)
			return this.dateTime(expDate)
		}
	},
	computed: {
		sortData (){
			let vm = this
			return vm.data.sort( (a,b) => {
				if ( vm.isReverse ) {
					return a[vm.sortItem] - b[vm.sortItem]
				} else {
					return b[vm.sortItem] - a[vm.sortItem]
				}
			})
		}
	}
};
</script>


<style lang="sass">
.table th.click
	cursor: pointer

.table th.click
	cursor: pointer

.icon
	display: inline-block
	
.icon.inverse
	transform: rotate(180deg)
</style>
