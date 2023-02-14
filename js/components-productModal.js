export default {
  props: ['tempProduct', 'isNew'],
  template: `<div id="productModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
<div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>{{ isNew ? '新增產品' : '編輯產品'}}</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl">
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
            </div>
            <!-- 參考片段 -->
            <!-- 判斷tempProduct是否有array作圖片 -->
            <template v-if="Array.isArray(tempProduct.imagesUrl)">
              <template v-for="(img, key) in tempProduct.imagesUrl" :key="key + 2023">
                <input type="text" class="form-control" v-model="tempProduct.imagesUrl[key]" placeholder="imageUrl">
                <img :src="tempProduct.imagesUrl[key]" alt="" class="img-fluid mb-3">
              </template>
              <!--  出現僚件: array沒有data的情況下, 現在的欄位有輸入 -->
              <button
                v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                class="btn btn-outline-primary btn-sm d-block w-100"
                @click="tempProduct.imagesUrl.push('')">新增圖片</button>
              <!-- 出現條件: array最少存在一則data,  -->
              <button v-else class="btn btn-outline-danger btn-sm d-block w-100"
                @click="tempProduct.imagesUrl.pop()">刪除圖片</button>
            </template>
            <!-- 沒有的話就貼出新增按鈕 -->
            <template v-else>
              <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImage()">新增圖片</button>
            </template>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                  v-model="tempProduct.category">
              </div>
              <div class="mb-3 col-md-6">
                <label for="unit" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                  v-model.number="tempProduct.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                  v-model.number="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                v-model="tempProduct.description">
                </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                v-model="tempProduct.content">
                </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                  v-model="tempProduct.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
        </button>
      </div>
    </div>
  </div>
</div>`,
  data() {
    return {
      domain: 'https://vue3-course-api.hexschool.io/v2',
      api_path: 'sakimotorin-vue2022',
      myModal: {}
    }
  },
  mounted() {
    this.myModal = new bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    updateProduct() {
      // 由於create / edit都使用同一個model, 用let定義,url/method會根據不用而改變
      let url = `${this.domain}/api/${this.api_path}/admin/product`
      let method = 'post'

      // isNew = 新增 / !isNew = 編輯
      if (!this.isNew) {
        url = `${this.domain}/api/${this.api_path}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }

      axios[method](url, { data: tempProduct })
        .then((res) => {
          alert(res.data.message)
          this.hideModal()
          this.$emit('getdata')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    openModal() {
      this.myModal.show()
    },
    hideModal() {
      this.myModal.hide()
    },
  },
}
