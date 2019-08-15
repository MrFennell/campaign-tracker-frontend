<template>
    <div v-if="this.scrollTarget != ''" class="content" id="list-pcs-container"> 
        <div>
            <CurrentPc v-bind:scrollTarget= "this.scrollTarget"/>   
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
                                <p class="card-title">{{ pc.pcName }}</p>
                                <p class="card-subtitle" v-if="pc.playerName">{{ pc.playerName }}</p>
                                <p class="card-subtitle" v-else >Player Unknown</p>
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
    props: 
        ['scrollTarget', 'selected', 'sort', 'sortDirection','columnSize']
    ,
    computed: {
        loadPcs(){
            let sortDirection = this.sortDirection;
            let pcs = this.$store.state.pcs;
            if (this.sort === 'name'){
                return _.orderBy(pcs, [pc => pc.pcName.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'playerName'){
                return _.orderBy(pcs, [pc => pc.playerName.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'createdDate'){
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
            this.isEditing = false,
            this.$nextTick(() => {
            this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"});
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
 