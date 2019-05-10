<template>
    <div class="content">
        <h2>Player Characters:</h2>
                <div class="box">
                        <div>
                             <AddPc></AddPc>
                        </div>
                         <div class="box">
                             <CurrentPc></CurrentPc>
                        </div>
                        <div>
                        <ul>
                            <li><router-link to="/pcs/" exact-active-class="is-active">Overall</router-link></li>
                            <li><router-link to="/pcs/alphabetical" exact-active-class="is-active">Sort by Name</router-link></li>
                            <li><router-link :to="selected" exact-active-class="is-active">Sort by {{selected}}</router-link></li>
                            <select v-model="selected">
                                <option disabled value="">Please select one</option>
                                <option>alphabetical</option>
                                <option>B</option>
                                <option>C</option>
                            </select>

                        </ul>
                         <router-view class="column"></router-view>
                        </div>
                </div>
               
            </div>
</template>

<script>
import AddPc from '@/components/pc/AddPc.vue';
import CurrentPc from '@/components/pc/CurrentPc.vue';

export default {
    components: {AddPc, CurrentPc},
    name: "PcContainer",
    props: ['list'],
    data() {
        return {
            selected: '',
            order: ''
        }
    },

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
 