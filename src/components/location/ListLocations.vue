<template>
    <div  class="content" id="list-locations-container">     
        <div >
            <CurrentLocation v-bind:scrollTarget= "this.scrollTarget"/>
        </div>
        <div class="columns is-multiline">
            <div :class="[columnSize]" 
                v-for="(location, index) in loadLocations" 
                v-bind:key="location.id">
                <div v-if="index <= selected-1" class="card" @click="setLocation(location)">
                    <div class="card-hover">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img v-if="location.imageSrc" :src="location.imageSrc" />
                                <img v-else src='../../assets/images/thumbnail-default.png'/>
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media-content">
                                <p class="card-title">{{ location.name }}</p>
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
import CurrentLocation from '@/components/location/CurrentLocation.vue';
export default {
    name: "ListLocations",
    components: {CurrentLocation},
    props: 
        ['scrollTarget', 'selected', 'sort', 'sortDirection','columnSize']
    ,
    computed: {
        loadLocations(){
            let sortDirection = this.sortDirection;
            let locations = this.$store.state.locations;
            if (this.sort === 'name'){
                return _.orderBy(locations, [location => location.name.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'createdDate'){
                return _.orderBy(locations, 'createdAt', sortDirection);
            }
            else{
                 return _.orderBy(locations, [location => location.name.toLowerCase()], sortDirection);
            }
        }
    },
    methods: {
        async setLocation(location){
            this.$store.dispatch('setLocation', location)
            this.listOptions = false
            this.$nextTick(() => {
                this.scrollTarget.scrollIntoView({behavior: "smooth"});
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    #list-locations-container{
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
 