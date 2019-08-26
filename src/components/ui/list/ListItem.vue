<template>
<div :class="[columnSize]" >
    <div v-if="!loaded">
        <p>Loading!</p>
    </div>
    <div v-if="loaded" class="card" @click="$emit('setListItem', item)">
        <div class="card-hover">
            <div class="card-image">
                <figure class="image is-4by3">
                    <div v-if="item.imageSrc !=='' && item.imageSrc !==null">
                        <img :src="'https://campaign-tracker.s3.us-east-2.amazonaws.com/'+imageFolder+'/'+item.imageSrc" />
                    </div>
                        <div v-else >
                        <img src='@/assets/images/thumbnail-default.png'/>
                        </div>
                </figure>
            </div>
            <div class="card-content">
                <div class="media-content">
                    <p v-if="item.pcName" class="card-title">{{ item.pcName }}</p>
                    <p v-else class="card-title">{{ item.name }}</p>
                    <p v-if="item.playerName" class="card-subtitle">{{ item.playerName }}</p>
                    <p class="card-subtitle" v-else >Player Unknown</p>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>

export default {
    name: "ListItem",
    props: 
        ['item','columnSize','imageFolder']
    ,
    data(){
        return {
            loaded: false
        }
    },
    mounted() {
        this.loaded = true
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
 