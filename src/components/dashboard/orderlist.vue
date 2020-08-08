<template>
  <div class="orderlist">
    <loading :active.sync="isLoading"></loading>
    <table class="table">
      <thead class="thead-light">
        <th>訂單編號</th>
        <th>訂購時間</th>
        <th>訂購人姓名</th>
        <th>Email</th>
        <th>訂單金額</th>
        <th width="80" class="text-center">是否付款</th>
        <th>付款時間</th>
        <th width="100" class="text-center">編輯</th>
        <th width="100" class="text-center">刪除</th>
      </thead>
      <tbody v-for="item in order" :key="item.id">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ getTime(item.create_at) }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.total | currency }}</td>
          <td class="text-center">
            <span v-if="item.is_paid" class="text-success">付款完成</span>
            <span v-else>尚未付款</span>
          </td>
          <td>
            <span v-if="item.paid_date">{{ getTime(item.paid_date) }}</span>
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-outline-primary" @click="openModal(item)">編輯</button>
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-outline-danger">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pages" @getPages="getOrder" />

    <!-- 編輯訂單 -->
    <div id="updateOrder" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">編輯訂單</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col">
              <p>訂單編號：{{ tempOrder.id }}</p>
              <p>訂購時間：{{ getTime(tempOrder.create_at) }}</p>
              <table class="table">
                <thead class="thead-light">
                  <th>品名</th>
                  <th class="text-center">數量</th>
                  <th class="text-right">原價</th>
                  <th class="text-right">售價</th>
                </thead>
                <tbody v-for="item in tempOrder.products" :key="item.id">
                  <tr>
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle text-center">{{ item.qty }}</td>
                    <td class="align-middle text-right">
                      {{ item.product.origin_price | currency }}
                    </td>
                    <td class="text-right">
                      {{ item.product.price | currency }}
                      <div class="text-success" v-if="item.coupon">
                        {{ item.coupon.title }}
                        <br>
                        {{ item.final_total | currency }}
                      </div>
                    </td>
                  </tr>
                </tbody>
                 <tfoot>
                    <tr>
                      <td colspan="3">總計</td>
                      <td class="text-right">{{ tempOrder.total | currency }}</td>
                    </tr>
                </tfoot>
              </table>
            </div>
            <hr>
            <div class="col">
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" id="name" class="form-control" v-model="tempOrder.user.name" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" v-model="tempOrder.user.email" />
              </div>
              <div class="form-group">
                <label for="tel">電話</label>
                <input type="tel" id="tel" class="form-control" v-model="tempOrder.user.tel" />
              </div>
              <div class="form-group">
                <label for="address">收件地址</label>
                <input
                  type="text"
                  id="address"
                  class="form-control"
                  v-model="tempOrder.user.address"
                />
              </div>
              <div class="form-group">
                <label for="comment">留言</label>
                <textarea name="" id="comment" class="form-control" cols="30" rows="2"
                v-model="tempOrder.message"></textarea>
                </div>
              <div class="form-group">
                <div for="is_paid" v-if="tempOrder.is_paid">
                  <span class="text-success">付款完成&nbsp;&nbsp;&nbsp;</span> 
                  <span>{{ getTime(tempOrder.paid_date) }}</span>
                </div>
                <div class="text-left" v-if="!tempOrder.is_paid">
                  <button class="btn btn-danger" @click="payOrder">確認付款</button>
                </div>
              </div>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder">更新訂單</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./pagination";

export default {
  name: "orderlist",
  components: {
    Pagination,
  },
  data() {
    return {
      order: [],
      pd: [],
      tempOrder: {
        user: {},
        products: {},
      },
      pages: {},
      isLoading: false,
      timestamp: "",
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getTime(item) {
      let newDate = new Date(item * 1000);
      let yy = newDate.getFullYear();
      let mm =
        (newDate.getMonth() + 1 < 10 ? "0" : "") + (newDate.getMonth() + 1);
      let dd = (newDate.getDate() < 10 ? "0" : "") + newDate.getDate();
      let hr = (newDate.getHours() < 10 ? "0" : "") + newDate.getHours();
      let mt = (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes();
      let sd = (newDate.getSeconds() < 10 ? "0" : "") + newDate.getSeconds();
      return `${yy}-${mm}-${dd} ${hr}:${mt}:${sd}`;
    },
    openModal(item) {
      const vm = this;
      vm.tempOrder = Object.assign(item);
      console.log(this.tempOrder)
      $("#updateOrder").modal("show");
    },
    getOrder(page = 1) {
      const vm = this;
      const api = process.env.API_PATH;
      const url = `${api}/api/${process.env.CUSTOM_PATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      this.axios.get(url).then((res) => {
        vm.isLoading = false;
        vm.order = res.data.orders;
        vm.pages = res.data.pagination;
      });
    },
    updateOrder() {
      const vm = this;
      const api = process.env.API_PATH;
      let url = `${api}/api/${process.env.CUSTOM_PATH}/admin/order/${vm.tempOrder.id}`;
      vm.isLoading = true;
      this.axios.put(url, { data: vm.tempOrder }).then((res) => {
        vm.isLoading = false;
        vm.getOrder();
        console.log(res.message);
        $("#updateOrder").modal("hide");
      })
    },
    payOrder() {
      const vm = this
      // console.log(vm.tempOrder.id)
      const {href} = this.$router.resolve({
        path: `/checkout/${vm.tempOrder.id}`,
      })
      window.open(href, '_blank');
      $("#updateOrder").modal("hide");
      vm.getOrder();
    },
  },
};
</script>
