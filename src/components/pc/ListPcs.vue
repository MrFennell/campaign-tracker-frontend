<template>
    <div class="content" id="list-pcs-container" ref="topCurrentPc">
            <div>
                <CurrentPc/>   
            </div>           

            <div id="options">
                <div v-if="!listOptions" class="level-right">
                    <a @click="listOptions = true"><font-awesome-icon icon="cog" /></a> 
                </div>
                <div v-if="listOptions" class="level-right">
                        <div class="field">
                            <label>Show: </label>
                            <div class="control">
                                <div class="select">
                                    <select v-model="selected"  id="list-options" >
                                        <option disabled value="">Show maximum:</option>
                                        <option>5</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>100</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label>Sort by: </label>
                            <div class="control">
                                <div class="select">
                                    <select v-model="sort" id="list-sort">
                                        <option disabled value="">Sort by field:</option>
                                        <option>PC Name</option>
                                        <option>Player Name</option>
                                        <option>Created Date</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a v-if="sortDirection === 'asc' " @click = "sortDirection = 'desc'" class="icon is-large"><font-awesome-icon icon="sort-up" /></a>
                            <a v-if="sortDirection === 'desc'" @click = "sortDirection = 'asc'" class="icon is-large"><font-awesome-icon icon="sort-down"  /></a>
                        </div>

                        <div class="field">
                            <label>Thumbnails per row: </label>
                            <div class="control">
                                <div class="select">
                                    <select v-model="columnSize" id="list-sort">
                                        <option disabled value="">Thumbnails per row:</option>
                                        <option value="column is-one-quarter">4</option>
                                        <option value="column is-one-fifth">5</option>
                                        <option value="column is-2">6</option>
                                        <option value="column is-1">12</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    <a  @click="listOptions = false"><font-awesome-icon icon="cog" /></a>
                </div>
            </div>

            <div class="columns is-multiline">
                <div :class="[columnSize]" 
                    v-for="(pc, index) in loadPcs" 
                    v-bind:key="pc.id">
                    <div v-if="index <= selected-1" class="card" @click="setPc(pc)">
                        <div class="card-hover">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img v-if="pc.imageSrc" :src="pc.imageSrc" />
                                    <img v-else src='../../assets/images/thumbnail-default.png'/>
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media-content">
                                    <p class="title is-4">{{ pc.pcName }}</p>
                                    <p class="subtitle is-6" v-if="pc.playerName">{{ pc.playerName }}</p>
                                    <p class="subtitle is-6" v-else >Player Unknown</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
        </div> 
    </div>
</template>

<script>

import _ from 'lodash';
import CurrentPc from '@/components/pc/CurrentPc.vue';

export default {
    name: "ListPcs",
    components: {CurrentPc},
    data(){
        return{
            selected: 10,
            sort: 'PC Name',
            listOptions: false,
            sortDirection: 'asc',
            columnSize: 'column is-2',
            showChangeImageButton: false,
            newImage: false,
        }
    },
    computed: {
        loadPcs(){
            let sortDirection = this.sortDirection;
            let pcs = this.$store.state.pcs;
            if (this.sort === 'PC Name'){
                return _.orderBy(pcs, [pc => pc.pcName.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'Player Name'){
                return _.orderBy(pcs, [pc => pc.playerName.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'Created Date'){
                return _.orderBy(pcs, 'createdAt', sortDirection);
            }
            else{
                 return _.orderBy(pcs, [pc => pc.pcName.toLowerCase()], sortDirection);
            }
        }
    },
    methods: {
        async setPc(pc){
            this.$store.dispatch('setPc', pc)
            this.listOptions = false
            this.showChangeImageButton = false
             this.isEditing = false,
            this.$nextTick(() => {
                this.$refs.topCurrentPc.scrollIntoView({behavior: "smooth"});
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    #list-pcs-container{
        margin-top:5px;
    }
    .card-hover:hover {
        opacity: 0.7;
        cursor: pointer;
    }
    #options{
        min-height: 40px;
    }
    
</style>
 