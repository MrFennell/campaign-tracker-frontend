<template>
    <div class="content">
            <!-- <div class="container"> -->
                <div id="list-limit">
                    <select v-model="selected">
                        <option disabled value="">Show maximum:</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                    <span>Show: {{ selected }}</span>
                </div>
                <div id="list-sort">
                    <select v-model="sort">
                        <option disabled value="">Sort by:</option>
                        <option>Default</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                    <span>Sort by: {{ sort }}</span>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-one-fifth" 
                        v-for="(pc, index) in loadPcs" 
                        v-bind:key="pc.id"
                        v-if="index <= selected-1">
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
                        
                    </div> 
                    <!-- <div class="column is-one-fifth" 
                        v-for="pc in loadPcs" 
                        v-bind:key="pc.id">
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
                        </div> -->

                    </div> 
                </div>
            </div>
    <!-- </div> -->
</template>

<script>
import _ from 'lodash';
export default {
    name: "ListPcs",
    // props: {
    //     list: null
    // },
    data(){
        return{
            selected: 20,
            sort: Default
        }
    },
    computed: {
        loadPcs(){
            let pcs = this.$store.state.pcs;
            
            if (this.sort === 'Ascending'){
                // return _.orderBy(this.$store.state.pcs, 'pcName', 'asc')
                return _.orderBy(pcs, 'pcName', 'asc');
            
            }
            else if (this.sort === 'Descending'){
                return _.orderBy(this.$store.state.pcs, 'pcName', 'desc');
            }
            else{
                 return this.$store.state.pcs;
            }
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
    #list-options{
        height: 40px;
    }
</style>
 