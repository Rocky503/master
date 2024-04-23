<script>
export default {
    props: {
        nxbs: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(nxb, index) in nxbs" :key="nxb._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ nxb.tenNxb }}
        </li>
    </ul>
</template>