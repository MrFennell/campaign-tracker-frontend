<template>
    <div class="content" id="list-npcs-container">     
        <div>
            <CurrentNpc v-bind:scrollTarget= "this.scrollTarget"/>
        </div>
        <div class="columns is-multiline">
            <div :class="[columnSize]" 
                v-for="(npc, index) in loadNpcs" 
                v-bind:key="npc.id">
                <div v-if="index <= selected-1" class="card" @click="setNpc(npc)">
                    <div class="card-hover">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img v-if="npc.imageSrc" :src="npc.imageSrc" />
                                <img v-else src='../../assets/images/thumbnail-default.png'/>
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media-content">
                                <p class="card-title">{{ npc.name }}</p>
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
    props: 
        ['scrollTarget', 'selected', 'sort', 'sortDirection','columnSize']
    ,
    computed: {
        loadNpcs(){
            let sortDirection = this.sortDirection;
            let npcs = this.$store.state.npcs;
            if (this.sort === 'name'){
                return _.orderBy(npcs, [npc => npc.name.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'createdDate'){
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
                this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"});
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
 