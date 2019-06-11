<template>
    <div class="content" ref="topCurrentNpc" id="list-npcs-container">     
                <div >
                    <CurrentNpc/>
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
                                            <option>NPC Name</option>
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

                        <a @click="listOptions = false"><font-awesome-icon icon="cog" /></a>
                    </div>
                </div>

                <div class="columns is-multiline">
                    <div :class="[columnSize]" 
                        v-for="(npc, index) in loadNpcs" 
                        v-bind:key="npc.id">
                        <div v-if="index <= selected-1" class="card" @click="setNpc(npc)">
                            <div class="card-hover">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img :src="npc.imageSrc" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media-content">
                                        <p class="title is-4">{{ npc.name }}</p>
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
import CurrentNpc from '@/components/npc/CurrentNpc.vue';
export default {
    name: "ListNpcs",
    components: {CurrentNpc},
    data(){
        return{
            selected: 10,
            sort: 'NPC Name',
            listOptions: false,
            sortDirection: 'asc',
            columnSize: 'column is-2'
        }
    },
    computed: {
        loadNpcs(){
            let sortDirection = this.sortDirection;
            let npcs = this.$store.state.npcs;
            if (this.sort === 'NPC Name'){
                return _.orderBy(npcs, [npc => npc.name.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'Created Date'){
                return _.orderBy(npcs, 'createdAt', sortDirection);
            }
            else{
                 return _.orderBy(npcs, [npc => npc.name.toLowerCase()], sortDirection);
            }
        }
    },
    methods: {
        async setNpc(npc){
            this.$store.dispatch('setNpc', npc)
            this.listOptions = false
            this.$nextTick(() => {
                this.$refs.topCurrentNpc.scrollIntoView();
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    #list-npcs-container{
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
 