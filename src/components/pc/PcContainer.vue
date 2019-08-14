<template>
    <div class="container is-fullhd">
        <div>
            <h2 ref="scrollHeader">Player Characters:</h2>
        </div>
         <!-- <CurrentPc></AddPc> -->
        <AddPc></AddPc>
        <div>
            <ListPcs :scrollHeader="this.$refs.pcHeader" ></ListPcs>
        </div>
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
 