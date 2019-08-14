<template>
    <div class="container is-fullhd">
        <div>
            <h2 ref="scrollHeader">Player Characters:</h2>
        </div>
         <!-- <CurrentPc></AddPc> -->
        <AddPc></AddPc>
        <ListPcs v-bind:scrollTarget= "this.scrollTarget"></ListPcs>

    </div>
</template>

<script>
// import _ from 'lodash';
import AddPc from '@/components/pc/AddPc.vue';
import ListPcs from '@/components/pc/ListPcs.vue';
// import CurrentPc from '@/components/pc/CurrentPc.vue';

export default {
    components: {
    AddPc, 
    ListPcs
    // CurrentPc
    },
    name: "PcContainer",
    data() {
        return {
            order: '',
            scrollTarget: ''
        }
    },
    mounted() {
        this.$store.dispatch('loadPcs'),
        this.scrollTarget = this.$refs.scrollHeader
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 