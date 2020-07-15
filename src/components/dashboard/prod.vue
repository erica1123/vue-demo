<template>
  <div class="product">
    <button type="button" class="btn btn-primary mb-4 float-right"
    @click="openModal">新增商品</button>
    <table class="table">
      <thead class="thead-light">
        <th width="150" class="text-center">分類</th>
        <th>產品名稱</th>
        <th width="100">原價</th>
        <th width="100">售價</th>
        <th width="80" class="text-center">啟用狀態</th>
        <th width="150" class="text-center">編輯</th>
      </thead>
      <tbody v-for="item in data" :key="item.id">
        <td class="text-center">{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.origin_price }}</td>
        <td>{{ item.price }}</td>
        <td class="text-center">
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td class="text-center">
          <button type="button" class="btn btn-outline-primary">編輯</button>
        </td>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="prodModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'product',
  data () {
    return {
      data: [],
      status: JSON.parse(localStorage.getItem('status')),
      msg: ''
    }
  },
  created (){
    this.getProduct()
  },
  methods: {
    getProduct() {
      const api = process.env.API_PATH
      const url = `${api}/api/${process.env.CUSTOM_PATH}/products/`
      this.axios.get( url ).then( res => {
        this.data.push(...res.data.products)
        // console.log(this.data)
      })
      this.msg = this.status || '狀態訊息'
    },
    openModal() {
      $('#prodModal').modal('show')
    },
  }
}
</script>
