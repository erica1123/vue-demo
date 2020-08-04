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
                        <div class="h5" v-if="!item.price">{{ item.origin_price }}</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5" v-if="!item.price">現在只要 {{ item.price }}元</div>
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
                    <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計 <strong>{{ product.num * product.price }}</strong> 元
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
            }
        }
    },
    created() {
        this.getProduct()
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
            })
        },
        addtoCart(id, qty = 1) {
            const vm = this
            const api = process.env.API_PATH;
            const url = `${api}/api/${process.env.CUSTOM_PATH}/cart`
            vm.status.loadingItem = id
            this.axios({
                method: 'post',
                url,
                data: {
                    product_id: id,
                    qty,
                },
            }).then( res => {
                console.log(res.data.message, res)
                vm.status.loadingItem = ''
            }).catch( err => {
                console.log(err)
            })
        },
    },
}
</script>