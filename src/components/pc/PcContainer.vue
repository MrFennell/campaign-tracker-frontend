<template>
    <div class="content">
        <h2>Player Characters:</h2>

            <div v-if="!showAddPc">
                <p><a @click="showAddPc = true">Add a new PC</a></p>
            </div>
            <div v-if="showAddPc">
                <div class="is-pulled-right">
                    <a class="delete" @click="showAddPc = false"></a>
                </div>
                <AddPc></AddPc>
            </div>

            <div>
                <!-- <div class="is-pulled-right">
                    <a class="delete" @click="hidePc()"></a>
                </div> -->
                <CurrentPc></CurrentPc>
            </div>
        
            <div class="box">
                    <div>
                        <ListPcs ></ListPcs>
                    </div>
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
            selected: '',
            order: '',
            tabs: ['AddPc', 'CurrentPc'],
            seen: false,
            showAddPc: false,
            showCurrentPc: false,
            loadPc: null
        }
    },

    methods: {
        async setPc(pc){
            this.$store.dispatch('setPc', pc),
            this.$store.dispatch('loadCampaigns');
        },
        async hidePc(){
            this.$store.dispatch('setPcNull', null)
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
 