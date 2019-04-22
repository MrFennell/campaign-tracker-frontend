<template>
    <div class="content">
        <h2>Player Characters:</h2>
            <div class="container">
                <div class="box">
                        <div>
                             <AddPc></AddPc>
                        </div>
                         <div class="box">
                             <CurrentPc></CurrentPc>
                        </div>
                        <div>
                            <ListPcs></ListPcs>
                        </div>
                        
                </div>
            </div>
    </div>
</template>

<script>
import AddPc from '@/components/pc/AddPc.vue';
import CurrentPc from '@/components/pc/CurrentPc.vue';
import ListPcs from '@/components/pc/ListPcs.vue';

export default {
    components: {AddPc, CurrentPc, ListPcs},
    name: "PcContainer",
    props: ['list'],
    methods: {
        async setPc(pc){
            this.$store.dispatch('setPc', pc)
        },
        async hidePc(){
            
        }
    },
    mounted() {
    this.$store.dispatch('loadPcs');
    }
    
}

</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 