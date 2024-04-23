<template>
    <div class="page">
        <h4>Thêm mới Liên hệ</h4>
        <BookForm :book="newBook" @submit:book="createBook" />
        <div class="toast bg-success" :class="{ 'show': message !== '' }" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    {{ message }}
                </div>
                <button type="button" class="btn text-white" data-dismiss="toast" aria-label="Close"
                    @click="clearMessage">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookForm,
    },
    data() {
        return {
            newBook: {},
            message: "",
        };
    },
    methods: {
        async createBook(data) {
            try {
                await BookService.create(data);
                this.message = "Lưu sách thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        clearMessage() {
            this.message = '';
        }
    },
};
</script>

<style>
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 300px;
    color: #fff;
}
</style>
