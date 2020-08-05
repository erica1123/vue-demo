<template>
  <div class="coupon">
    <loading :active.sync="isLoading"></loading>

    <button type="button" class="btn btn-primary mb-4 float-right" @click="openModal(true)">新增優惠券</button>
    <table class="table">
      <thead class="thead-light">
        <th>標題</th>
        <th>優惠碼</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th width="80" class="text-center">是否啟用</th>
        <th width="100" class="text-center">編輯</th>
        <th width="100" class="text-center">刪除</th>
      </thead>
      <tbody v-for="item in coupon" :key="item.id">
        <tr>
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-outline-primary" 
            @click="openModal(false, item)">編輯</button>
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-outline-danger" 
            @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pages" @getPages="getCoupon"/>

    <!-- 新增/編輯 -->
    <div id="updateCoupon" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="code">標題</label>
              <input type="text" id="title" class="form-control" placeholder="請輸入標題" 
              v-model="tempCoupon.title">
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input type="text" id="code" class="form-control" placeholder="請輸入優惠碼" 
              v-model="tempCoupon.code">
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input type="number" id="percent" class="form-control" placeholder="100"
              v-model="tempCoupon.percent">
            </div>
            <div class="form-group">
              <label for="expiryDate">到期日</label>
              <input type="date" id="expiryDate" class="form-control" placeholder="請輸入到期日"
              v-model="tempCoupon.due_date">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="is_enabled" 
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"/>
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除 -->
    <div id="deleteCoupon" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除 Coupon 券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> (Coupon 券刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import $ from "jquery";
import Pagination from './pagination'

export default {
  name: "coupon",
  components: {
    Pagination
  },
  data() {
    return {
      coupon: [],
      tempCoupon: {},
      pages: {},
      isLoading: false,
      isNew: false,
    };
  },
  created() {
    this.getCoupon()
  },
  methods: {
    openModal(isNew, item) {
      if( isNew ) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
      $('#updateCoupon').modal('show')
    },
    openDelModal(item) {
      this.tempCoupon = item
      console.log(item.title)
      $('#deleteCoupon').modal('show')
    },
    getCoupon(page = 1) {
      const vm = this
      const api = process.env.API_PATH;
      const url = `${api}/api/${process.env.CUSTOM_PATH}/admin/coupons?page=${page}`
      vm.isLoading = true
      this.axios.get(url).then(res => {
        vm.isLoading = false
        vm.coupon = res.data.coupons
        vm.pages = res.data.pagination
      })
    },
    updateCoupon() {
      const vm = this
      const api = process.env.API_PATH;
      let url = `${api}/api/${process.env.CUSTOM_PATH}/admin/coupon`
      let httpMethod = 'post'

      if ( !vm.isNew ) {
         url = `${api}/api/${process.env.CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`
         httpMethod = 'put'
      }

      this.axios[httpMethod](url, {data: vm.tempCoupon}).then( res => {
        if( !res.data.success ){
          console.log(res.data.message)
        }
        this.getCoupon()
        $('#updateCoupon').modal('hide')
      })
      .catch( err => {
        console.log(err)
      })
    },
    deleteCoupon() {
      const vm = this
      const api = process.env.API_PATH;
      const url = `${api}/api/${process.env.CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.isLoading = true
      this.axios.delete(url).then( res => {
        vm.isLoading = false
        vm.coupon = res.data.coupons
        if( !res.data.success ) {
          console.log(res.data.message)
        }
        this.getCoupon()
        $('#deleteCoupon').modal('hide')
      })
    },



  },
};
</script>
