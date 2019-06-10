<template>
    <div class="container is-fullhd">
        <h2>Player Characters:</h2>
        <AddPc></AddPc>
        <CurrentPc></CurrentPc>

        <div class="box">
            <ListPcs ></ListPcs>
        </div>
    </div>
</template>

<script>
// import _ from 'lodash';
import AddPc from '@/components/pc/AddPc.vue';
import ListPcs from '@/components/pc/ListPcs.vue';
import CurrentPc from '@/components/pc/CurrentPc.vue';

export default {
    components: {AddPc, CurrentPc, ListPcs},
    name: "PcContainer",
    data() {
        return {
            order: '',
        }
    },
    mounted() {
        this.$store.dispatch('loadPcs')
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 