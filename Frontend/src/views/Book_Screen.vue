<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Sách
                <i class="fas fa-book"></i>
            </h4>
            <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
            <p v-else>Không có sách nào.</p>
            <div class="mt-3 row justify-content-start align-items-center pl-3">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                    Chi tiết sách
                    <i class="fas fa-bookmark"></i>
                </h4>
                <BookCard :book="activeBook" :nxbId="activeBook.maNxb" />
                <button class="mt-2 badge badge-warning" @click="borrowBook(activeBook._id)">
                    Mượn sách</button>
            </div>
        </div>
    </div>
</template>
<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";
import BorrowService from "@/services/borrow.service";

export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { tenSach, namXuatBan, nguonGoc } = book;
                return [tenSach, namXuatBan, nguonGoc].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async borrowBook(bookid) {
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const formattedDate = `${day}/${month}/${year}`;
                const userid = this.$store.getters.getUserId;

                const borrowedBooks = await BorrowService.getAll();
                const isBookBorrowed = borrowedBooks.some(book => book.maSach === bookid && book.maDocGia === userid);
                if (isBookBorrowed) {
                    alert("Sách này đã được mượn bởi bạn.");
                    return;
                }

                const data = {
                    maDocGia: userid,
                    maSach: bookid,
                    ngayMuon: formattedDate,
                    ngayTra: '',
                };
                await BorrowService.create(data);
                alert("Bạn đã mượn sách thành công!");
            } catch (error) {
                console.error("Lỗi khi mượn sách:", error);
                alert("Đã xảy ra lỗi khi mượn sách. Vui lòng thử lại sau.");
            }
        },
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>