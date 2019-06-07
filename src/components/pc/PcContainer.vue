<template>
    <div class="content">
        <h2>Player Characters:</h2>
            <!-- <div>
                <button v-for="tab in tabs" :key="tab" @click="selected = tab;">
                {{ tab }}
                </button>
                <div v-if="selected != ''" class="box">
                    <div class="is-pulled-right">
                    <a v-if="selected != ''" class="delete" @click="selected = ''"></a>
                    </div>
                    <component :is="selected"></component>
                </div>
            </div> -->
            <div v-if="!showAddPc">
                <p><a @click="showAddPc = true">Add a new PC</a></p>
            </div>
            <div v-if="showAddPc">
                <div class="is-pulled-right">
                    <a class="delete" @click="showAddPc = false"></a>
                </div>
                <AddPc></AddPc>
            </div>

            <div v-if="showCurrentPc">
                <div class="is-pulled-right">
                    <a class="delete" @click="showCurrentPc = false"></a>
                </div>
                <CurrentPc v-bind:showCurrentPc="this.showCurrentPc"></CurrentPc>
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
            showCurrentPc: true
        }
    },

    methods: {
        async setPc(pc){
            this.$store.dispatch('setPc', pc),
            this.$store.dispatch('loadCampaigns');
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
 