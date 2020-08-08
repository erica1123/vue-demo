<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>

    <button type="button" class="btn btn-primary mb-4 float-right" @click="openModal(true)">新增商品</button>
    <table class="table">
      <thead class="thead-light">
        <th width="150" class="text-center">分類</th>
        <th>產品名稱</th>
        <th width="100">原價</th>
        <th width="100">售價</th>
        <th width="80" class="text-center">啟用狀態</th>
        <th width="100" class="text-center">編輯</th>
        <th width="100" class="text-center">刪除</th>
      </thead>
      <tbody v-for="item in data" :key="item.id">
        <td class="text-center">{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.origin_price | currency }}</td>
        <td>{{ item.price | currency }}</td>
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
      </tbody>
    </table>
    <Pagination :pagination="pages" @getPages="getProduct"/>
    <!-- 
      getPages: 元件內自訂方法
      pagination: 元件內自訂變數
    -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="prouctdModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl"/>
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-pulse" v-if="status.fileUploading == 'loading'"></i>
                    <i class="fa fa-check-circle" v-if="status.fileUploading == 'done'"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files"
                    @change="uploadFile"/>
                </div>
                <img
                  :src="tempProduct.imageUrl"
                  class="img-fluid"
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title"/>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit"/>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price"/>
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" 
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"/>
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Modal -->
    <div
      class="modal fade"
      id="deleteProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> (商品刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
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
  name: "product",
  components: {
    Pagination
  },
  data() {
    return {
      data: [],
      tempProduct: {},
      pages: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: 'default'
      },
    };
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct(page = 1) {
      const vm = this
      const api = process.env.API_PATH;
      const url = `${api}/api/${process.env.CUSTOM_PATH}/products?page=${page}`
      vm.isLoading = true
      this.axios.get(url).then(res => {
        vm.isLoading = false
        vm.data = res.data.products
        vm.pages = res.data.pagination
      })
    },
    openModal(isNew, item) {
      
      if( isNew ) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item) // ES6
        this.isNew = false
      }
      $("#prouctdModal").modal("show")
    },
    updateProduct() {
      const vm = this
      const api = process.env.API_PATH;
      let url = `${api}/api/${process.env.CUSTOM_PATH}/admin/product`
      let httpMethod = 'post'
      
      if (!vm.isNew) {
        url = `${api}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }

      this.axios[httpMethod](url, { data: vm.tempProduct }).then(res => {
        if (res.data.success) {
          $("#prouctdModal").modal("hide")
          vm.getProduct()
          this.$bus.$emit("message:push", res.data.message, "success");
        } else {
          $("#prouctdModal").modal("hide")
          vm.getProduct()
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      })
    },
    openDelModal(item) {
      this.tempProduct = item
      console.log(item.title)
      $('#deleteProductModal').modal('show')
      
    },
    deleteProduct() {
      const vm = this
      const api = process.env.API_PATH;
      const url = `${api}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`
      this.axios.delete( url ).then( res => {
        vm.data = res.data.products
        if (res.data.success) {
          $("#deleteProductModal").modal("hide");
          vm.getProduct()
        } else {
          $("#deleteProductModal").modal("hide");
          vm.getProduct()
        }
        console.log(res.data)
      })
    },
    uploadFile() {
      const vm = this
      const uploadFile = this.$refs.files.files[0]
      const formData = new FormData()
      const api = process.env.API_PATH;
      const url = `${api}/api/${process.env.CUSTOM_PATH}/admin/upload`
      formData.append('file-to-upload', uploadFile)
      vm.status.fileUploading = 'loading'
      this.axios.post( url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then( res => {
        if( res.data.success ) {
          // vm.tempProduct.imageUrl = res.data.imageUrl
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl)
          vm.status.fileUploading = ''
          console.log(res)
          this.$bus.$emit("message:push", '上傳圖片成功', "success");
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
        
        // console.log(res.data)
      })
    },
  }
};
</script>
