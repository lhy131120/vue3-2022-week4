// import module {}
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js'
import pagination from './js/components-pagination.js'
import productModal from './js/components-productModal.js'
import deleteModal from './js/components-deleteModal.js'

const vm = {
  data() {
    return {
      domain: 'https://vue3-course-api.hexschool.io/v2',
      api_path: 'sakimotorin-vue2022',
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false, // 用作迿別新增或確認
      page: {}, // 設定page屬性
    }
  },
  components: {
    pagination,
    productModal,
    deleteModal,
  },
  mounted() {
    // checkuser前先取cookie
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('vue2022Ex='))
      ?.split('=')[1]
    axios.defaults.headers.common['Authorization'] = cookieValue
    this.checkUser()
  },
  methods: {
    checkUser() {
      axios
        .post(`${this.domain}/api/user/check`)
        .then((res) => {
          // console.log(res)
          this.getProducts()
        })
        .catch((err) => {
          alert(err.data.message)
          window.location = './login.html'
        })
    },
    getProducts(page = 1) {
      // 只有參數的話會undefined, 需要用ES6的參數預設值
      axios
        .get(`${this.domain}/api/${this.api_path}/admin/products/?page=${page}`)
        .then((res) => {
          console.log(res.data)
          this.products = res.data.products
          this.page = res.data.pagination
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        }
        this.isNew = true
        this.$refs.productModal.myModal.show()
      } else if (status === 'edit') {
        this.tempProduct = { ...product }
        this.isNew = false
        this.$refs.productModal.myModal.show()
      } else if (status === 'delete') {
        this.tempProduct = { ...product }
        this.$refs.delModal.myModal.show()
      }
    },
    createImage() {
      // 新增空Array, 並建立需要定義的格式
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },
  },
}

createApp(vm)
  .component('product-modal', {
    props: ['tempProduct', 'isNew'],
    template: '#product-modal-template',
    data() {
      return {
        domain: 'https://vue3-course-api.hexschool.io/v2',
        api_path: 'sakimotorin-vue2022',
      }
    },
    mounted() {
      productModal = new bootstrap.Modal(
        document.getElementById('productModal'),
      )
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

        axios[method](url, { data: this.tempProduct })
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
        productModal.show()
      },
      hideModal() {
        productModal.hide()
      },
    },
  }).mount('#app');
