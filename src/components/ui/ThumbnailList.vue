<template>
    <!-- an attempt at creating a dynamic list that could be passed the separate states. Fix or delete later. -->
    <div class="content" id="list-pcs-container" ref="topCurrentPc"> 
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

export default {
    name: "ThumbnailList",
    props:{
        listItem: String,
        listItems: String
    },
    data(){
        return{
            selected: 10,
            sort: 'PC Name',
            listOptions: false,
            sortDirection: 'asc',
            columnSize: 'column is-2',
            showChangeImageButton: false,
            newImage: false,
            item: this.listItem,
            items: this.listItems
        }
    },
    computed: {
        loadPcs(){
            let sortDirection = this.sortDirection;

            // listItem = this.listItem;
            
            const items = this.items;
            console.log('items:'+items);
            let pcs = this.$store.state.pcs;
             console.log('pcs:'+pcs);
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
 