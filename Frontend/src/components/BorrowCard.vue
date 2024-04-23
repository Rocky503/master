<script>
import BookService from "@/services/book.service";
import GuestService from "@/services/guest.service";


export default {
    props: {
        borrow: { type: Object, required: true },
        maSach: { type: String, required: true },
        maDocGia: { type: String, required: true },
    },
    data() {
        return {
            bookName: "N/a",
            guestName: "N/a",
        };
    },
    async mounted() {
        this.fetchName();
        this.fetchBookName();
    },
    watch: {
        maSach(newVal) {
            this.fetchBookName();
        },
        maDocGia(newVal) {
            this.fetchName();
        }
    },
    methods: {
        async fetchBookName() {
            try {
                const book = await BookService.get(this.maSach);
                this.bookName = book.tenSach;
            } catch (error) {
                console.log(error);
                this.bookName = "N/A";
            }
        },
        async fetchName() {
            try {
                const guest = await GuestService.get(this.maDocGia);
                this.guestName = guest.hoLot + " " + guest.ten;
            } catch (error) {
                console.log(error);
                this.guestName = "N/A";
            }
        }
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Độc giả:</strong>
            {{ guestName }}
        </div>
        <div class="p-1">
            <strong>Tên Sách:</strong>
            {{ bookName }}
        </div>
        <div class="p-1">
            <strong>Ngày Mượn:</strong>
            {{ borrow.ngayMuon }}
        </div>
        <div class="p-1">
            <strong>Ngày Trả:</strong>
            {{ borrow.ngayTra }}
        </div>
    </div>
</template>
