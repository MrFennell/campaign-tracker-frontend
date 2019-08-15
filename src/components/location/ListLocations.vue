<template>
    <div class="content" id="list-locations-container">     
        <div >
            <CurrentLocation v-bind:scrollTarget= "this.scrollTarget"/>
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
                                    <option>Location Name</option>
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
    data(){
        return{
            selected: 10,
            sort: 'Location Name',
            listOptions: false,
            sortDirection: 'asc',
            columnSize: 'column is-2',
            scrollObject: ''
        }
    },
    props: 
        ['scrollTarget']
    ,
    computed: {
        loadLocations(){
            let sortDirection = this.sortDirection;
            let locations = this.$store.state.locations;
            if (this.sort === 'Location Name'){
                return _.orderBy(locations, [location => location.name.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'Created Date'){
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
                this.scrollObject.scrollIntoView({behavior: "smooth"});
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
 