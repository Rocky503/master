<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Mượn sách
                <i class="fas fa-borrow"></i>
            </h4>
            <BorrowList v-if="filteredBorrowsCount > 0" :borrows="filteredBorrows" v-model:activeIndex="activeIndex" />
            <p v-else>Không có mượn sách nào.</p>
            <div class="mt-3 row justify-content-start align-items-center pl-3">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBorrow">
                <h4>
                    Chi tiết mượn sách
                </h4>
                <BorrowCard :borrow="activeBorrow" :maDocGia="activeBorrow.maDocGia" :maSach="activeBorrow.maSach" />
                <button class="mt-2 badge badge-warning" @click="returnBook(activeBorrow._id)">Đã Trả</button>
            </div>
        </div>
    </div>
</template>
<script>
import BorrowCard from "@/components/BorrowCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BorrowList from "@/components/BorrowList.vue";
import BorrowService from "@/services/borrow.service";
export default {
    components: {
        BorrowCard,
        InputSearch,
        BorrowList,
    },
    data() {
        return {
            borrows: [],
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
        borrowStrings() {
            return this.borrows.map((borrow) => {
                const { ngayMuon } = borrow;
                return [ngayMuon].join("");
            });
        },
        filteredBorrows() {
            if (!this.searchText) return this.borrows;
            return this.borrows.filter((_borrow, index) =>
                this.borrowStrings[index].includes(this.searchText)
            );
        },
        activeBorrow() {
            if (this.activeIndex < 0) return null;
            return this.filteredBorrows[this.activeIndex];
        },
        filteredBorrowsCount() {
            return this.filteredBorrows.length;
        },
    },
    methods: {
        async retrieveBorrows() {
            try {
                this.borrows = await BorrowService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBorrows();
            this.activeIndex = -1;
        },
        async returnBook(bookId) {
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const formattedDate = `${day}/${month}/${year}`;

                const borrow = await BorrowService.get(bookId);
                console.log(borrow.ngayTra);
                if (borrow.ngayTra !== "") {
                    alert("Sách đã được trả! Cập nhật thất bại!");
                } else {
                    const data = {
                        ngayTra: formattedDate,
                    };

                    await BorrowService.update(bookId, data);
                    alert("Cập nhật ngày trả thành công!");
                }
            } catch (error) {
                console.log(error);
            }
        }
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