<template>
    <div class="order">
        <loading :active.sync="isLoading"></loading>
        <div class="card-columns">
            <div class="card border-0 shadow-sm" v-for="item in data" :key="item.id">
                <div style="height: 150px; background-size: cover; background-position: center;"
                :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price | currency }}</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price | currency }}</div>
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm"
                    @click="getUniqProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" 
                    @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                        加到購物車
                    </button>
                </div>
            </div>
        </div>

        <!-- Detail Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h4" v-if="!product.price">{{ product.origin_price | currency  }}</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price | currency  }}</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price | currency  }}</div>
                    </div>
                    <select name="" class="form-control mt-3">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計 <strong>{{ product.num * product.price | currency }}</strong>
                    </div>
                    <button type="button" class="btn btn-primary"
                    @click="addtoCart(product.id, product.num)">
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    加到購物車
                    </button>
                </div>
            </div>
        </div>
        </div>


        <!-- 購物車 -->
        <div class="my-5 row justify-content-center">
            <div class="col-8">
                <table class="table">
                    <thead>
                        <th></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart.carts" :key="item.id">
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="removeCartItem(item.id)">
                            <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right">總計</td>
                            <td class="text-right">{{ cart.total | currency }}</td>
                        </tr>
                        <tr v-if="cart.total !== cart.final_total">
                            <td colspan="3" class="text-right text-success">折扣價</td>
                            <td class="text-right text-success">{{ cart.final_total | currency }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm">
                    <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                        套用優惠碼
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 建立訂單 -->
        <div class="my-5 row justify-content-center">
            <form class="col-md-6"  @submit.prevent="createOrder">
                <div class="form-group">
                <label for="useremail">Email</label>
                <input type="email" class="form-control" name="email" id="useremail" 
                :class="{'is-invalid': errors.has('email')}"
                v-model="form.user.email" v-validate="'required|email'" placeholder="請輸入 Email">
                <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email')}}</span>
                </div>
            
                <div class="form-group">
                <label for="username">收件人姓名</label>
                <input type="text" class="form-control" name="name" id="username" 
                :class="{'is-invalid': errors.has('name')}"
                v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
                <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                </div>
            
                <div class="form-group">
                <label for="usertel">收件人電話</label>
                <input type="tel" class="form-control" id="usertel" name="tel" placeholder="請輸入電話"
                :class="{'is-invalid': errors.has('tel')}" v-validate="'required'"
                v-model="form.user.tel">
                <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
                </div>
                
            
                <div class="form-group">
                <label for="useraddress">收件人地址</label>
                <input type="text" class="form-control" name="address" id="useraddress" 
                :class="{'is-invalid': errors.has('address')}"
                v-model="form.user.address" v-validate="'required'" placeholder="請輸入地址">
                <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                </div>
            
                <div class="form-group">
                <label for="comment">留言</label>
                <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                <button class="btn btn-danger">送出訂單</button>
                </div>
            </form>
        </div>
        

    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name: 'order',
    data() {
        return {
            data: [],
            isLoading: false,
            product: {},
            status: {
                loadingItem: '',
            },
            cart: {
                carts: {}
            },
            coupon_code: '',
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            }
        }
    },
    created() {
        this.getProduct()
        this.getCart()
    },
    methods: {
      getProduct() {
        const vm = this
        const api = process.env.API_PATH;
        const url = `${api}/api/${process.env.CUSTOM_PATH}/products`
        vm.isLoading = true
        this.axios.get(url).then( res => {
            vm.isLoading = false
            vm.data = res.data.products
            }).catch( err => {
                console.log(err)
            })
        },
        getUniqProduct(id) {
            const vm = this
            const api = process.env.API_PATH;
            const url = `${api}/api/${process.env.CUSTOM_PATH}/product/${id}`
            vm.status.loadingItem = id
            this.axios.get(url).then( res => {
                vm.isLoading = false
                vm.product = res.data.product
                $('#productModal').modal('show')
                vm.status.loadingItem = ''
                // console.log(vm.product.num)
            })
        },
        addtoCart(id, qty = 1) {
            const vm = this
            const api = process.env.API_PATH;
            const url = `${api}/api/${process.env.CUSTOM_PATH}/cart`
            vm.status.loadingItem = id
            const cart = {
                product_id: id,
                qty,
            }
            this.axios.post(url, {data: cart}).then( res => {
                console.log(res.data.message)
                vm.getCart()
                vm.status.loadingItem = ''
                $('#productModal').modal('hide')
            }).catch( err => {
                console.log(err)
            })
        },
        getCart() {
            const vm = this
            const api = process.env.API_PATH;
            const url = `${api}/api/${process.env.CUSTOM_PATH}/cart`
            vm.isLoading = true
            this.axios.get(url).then( res => {
                vm.isLoading = false
                vm.cart = res.data.data
                console.log(res)
            })
        },
        removeCartItem(id) {
            const vm = this
            const api = process.env.API_PATH;
            const url = `${api}/api/${process.env.CUSTOM_PATH}/cart/${id}`
            vm.isLoading = true
            this.axios.delete(url).then( res => {
                vm.isLoading = false
                vm.getCart()
                console.log(res.data)
            })
        },
        addCouponCode() {
            const vm = this
            const api = process.env.API_PATH;
            const url = `${api}/api/${process.env.CUSTOM_PATH}/coupon`
            const coupon = {
                code: vm.coupon_code
            }
            vm.isLoading = true
            this.axios.post(url, {data: coupon}).then( res => {
                vm.isLoading = false
                vm.getCart()
                console.log(res)
                if( !res.data.success ) {
                    console.log(res.data.message)
                }
            })
        },
        createOrder() {
            const vm = this
            const api = process.env.API_PATH;
            const url = `${api}/api/${process.env.CUSTOM_PATH}/order`
            const order = vm.form
            vm.isLoading = true
            this.$validator.validate().then( result => {
                if(result) {
                    this.axios.post(url, {data: order}).then( res => {
                        if( res.data.success ) {
                            vm.$router.push(`/checkout/${res.data.orderId}`)
                        }
                        // vm.getCart()
                        console.log(res)
                    })
                } else {
                    console.log('欄位不完整')
                }
                vm.isLoading = false
            })
            
        },

    },
}
</script>