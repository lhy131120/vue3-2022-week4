export default {
  props: ['tempProduct'],
  template: `<div ref="modal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">
          確認刪除
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
    deleteProduct() {
      axios
        .delete(
          `${this.domain}/api/${this.api_path}/admin/product/${this.tempProduct.id}`,
        )
        .then((res) => {
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
