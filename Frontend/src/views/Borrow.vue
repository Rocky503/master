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
                const userid = this.$store.getters.getUserId;
                const borrows = await BorrowService.getAll();
                this.borrows = borrows.filter(borrow => borrow.maDocGia === userid);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBorrows();
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