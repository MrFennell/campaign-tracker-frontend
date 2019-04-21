<template>
    <div class="content">
        <h2>Player Characters:</h2>
            <div class="container">


                <currentPc></currentPc>
                <div class="columns is-multiline">
                         <div class="column is-one-fifth">
                             <AddPc></AddPc>
                        </div>
                        
                        <div class="column is-one-fifth" v-for="pc in loadPcs" v-bind:key="pc.id">
                                <!-- <router-link class="subtitle" :to="{ name: 'pc', params: { id: pc.id }}"> -->
                                <div class="card" @click="setPc(pc)">
                                    <div class="card-hover">
                                        <div class="card-image">
                                            
                                            <figure class="image is-4by3">
                                                <img :src="pc.imageSrc" />
                                            </figure>
                                        </div>
                                        <div class="card-content" >
                                            <div class="media-content">
                                                <p class="title is-4">{{ pc.pcName }}</p>
                                                <p class="subtitle is-6" v-if="pc.playerName">{{ pc.playerName }}</p>
                                                <p class="subtitle is-6" v-else >Player Unknown</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- </router-link> -->

                        </div>

                        
                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
import AddPc from '@/components/AddPc.vue';
import CurrentPc from '@/components/CurrentPc.vue';
export default {
    components: {AddPc, CurrentPc},
    name: "ListPcs",
    props: ['list'],
    computed: {
        loadPcs(){
            // if (this.list === 'full'){
            return this.$store.state.pcs;
            // return this.$store.getters.hasPlayers;
            // }
        }
    },
    methods: {
        async setPc(pc){
            this.$store.dispatch('setPc', pc)
        }
    }
    
}

</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 