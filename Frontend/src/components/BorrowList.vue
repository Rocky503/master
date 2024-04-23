<script>
export default {
    props: {
        borrows: { type: Array, default: [] },
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    }
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(borrow, index) in borrows" :key="borrow._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ borrow.ngayMuon }}
        </li>
    </ul>
</template>