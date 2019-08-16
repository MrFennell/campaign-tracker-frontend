<template>
    <div class="container is-fullhd">
        <h2 ref="scrollHeader">Non-Player Characters:</h2>
        <div class="list-controls">
            <a @click.prevent="formToggle" v-bind:class="{ active: isActive  === 'new'}">Add a new PC</a>
            <a @click.prevent="optionsToggle" v-bind:class="{ active: isActive  === 'sort'}">Sort</a>
        </div>
        <div>
            <CurrentNpc v-bind:scrollTarget= "this.scrollTarget"/>
        </div>
         <span class="success-message">{{successMessage}}</span>
        <AddNpc v-if="showForm"
         v-bind:successMessage.sync="successMessage"
         v-bind:showForm.sync="showForm"
         v-bind:scrollTarget= "this.scrollTarget"
        ></AddNpc>
        <ListControls 
            v-if="showOptions"
            target="npc"
            v-bind:listOptions.sync="listOptions"
            v-bind:selected.sync="selected"
            v-bind:sort.sync="sort"
            v-bind:columnSize.sync="columnSize"
            v-bind:sortDirection.sync="sortDirection"
        />
        <!-- <CurrentNpc></CurrentNpc> -->
        <ListNpcs 
            v-bind:scrollTarget= "this.scrollTarget"
            v-bind:selected = "this.selected"
            v-bind:sort = "this.sort"
            v-bind:sortDirection = "this.sortDirection"
            v-bind:columnSize = "this.columnSize"
        ></ListNpcs>
    </div>
</template>

<script>
// import _ from 'lodash';
import AddNpc from '@/components/npc/AddNpc.vue';
import ListNpcs from '@/components/npc/ListNpcs.vue';
import ListControls from '@/components/ui/ListControls.vue';
import CurrentNpc from '@/components/npc/CurrentNpc.vue';

export default {
    components: {
    AddNpc,  
    ListNpcs,
    ListControls,
    CurrentNpc
    },
    name: "NpcContainer",
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
        this.$store.dispatch('loadNpcs'),
        this.scrollTarget = this.$refs.scrollHeader
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 