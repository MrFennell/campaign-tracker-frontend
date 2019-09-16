<template>
    <div class="container is-fullhd">
        <h2 ref="scrollHeader">Locations:</h2>
        <div class="list-controls">
            <a @click.prevent="formToggle" v-bind:class="{ active: isActive  === 'new'}">Add a new Location</a>
            <a @click.prevent="optionsToggle" v-bind:class="{ active: isActive  === 'sort'}">Sort</a>
        </div>
        
        <AddLocation v-if="showForm"
            v-bind:successMessage.sync="successMessage"
            v-on:hideForm="formToggle"
            v-bind:scrollTarget= "this.scrollTarget"
        ></AddLocation>
        <ListControls 
            v-if="showOptions" 
            target="location" 
            v-bind:listOptions.sync="listOptions"
            v-bind:selected.sync="selected"
            v-bind:sort.sync="sort"
            v-bind:columnSize.sync="columnSize"
            v-bind:sortDirection.sync="sortDirection"
        />
        <div >
            <CurrentLocation v-bind:scrollTarget= "this.scrollTarget"/>
        </div>
        <ListLocations 
            v-bind:scrollTarget= "this.scrollTarget"
            v-bind:selected = "this.selected"
            v-bind:sort = "this.sort"
            v-bind:sortDirection = "this.sortDirection"
            v-bind:columnSize = "this.columnSize"
        ></ListLocations>
    </div>
</template>

<script>
import AddLocation from '@/components/location/AddLocation.vue';
import ListLocations from '@/components/location/ListLocations.vue';
import ListControls from '@/components/ui/ListControls.vue';
import CurrentLocation from '@/components/location/CurrentLocation.vue';

export default {
    components: {
    AddLocation,
    ListLocations,
    ListControls,
    CurrentLocation
    },
    name: "LocationContainer",
    data() {
        return {
            order: '',
            scrollTarget: '',
            selected: 10,
            sort: 'name',
            listOptions: false,
            sortDirection: 'asc',
            columnSize: 'column is-2',
            showForm: false,
            showOptions: false,
            isActive: null,
            successMessage: ''
        }
    },
    watch: {
        successMessage: function(newValue){
            if(newValue){
                setTimeout(() => this.successMessage = null, 3000);
            }
        }
    },
    methods: {
        formToggle(){
            if (this.showForm === true){
                this.showForm = false;
                this.isActive = null;
            }else{
                this.showOptions = false;
                this.showForm = true;
                this.isActive = 'new';
            }
        },
        optionsToggle(){
            if (this.showOptions === true){
                this.showOptions = false;
                this.isActive = null;
            }else{
                this.showOptions = true;
                this.showForm = false;
               this.isActive = 'sort';
            }
        }
    },
    mounted() {
        this.$store.dispatch('loadLocations'),
        this.scrollTarget = this.$refs.scrollHeader
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 