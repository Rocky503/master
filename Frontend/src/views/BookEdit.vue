<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh Sách</h4>
        <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                this.message = "Cập nhật sách thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        clearMessage() {
            this.message = '';
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa sách này?")) {
                try {
                    await BookService.delete(this.book._id);
                    this.$router.push({ name: "book" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
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