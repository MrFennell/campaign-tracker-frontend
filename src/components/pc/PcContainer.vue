<template>
    <div class="container is-fullhd">
        <h2 ref="scrollHeader">Player Characters:</h2>
       
        <div class="list-controls">
            <a @click.prevent="formToggle" v-bind:class="{ active: isActive  === 'new'}">Add a new PC</a>
            <a @click.prevent="optionsToggle" v-bind:class="{ active: isActive  === 'sort'}">Sort</a>
        </div>
         <div>
        <CurrentPc 
            v-bind:scrollTarget= "this.scrollTarget"/>   
        </div> 
        <span class="success-message">{{successMessage}}</span>
        <AddPc v-if="showForm"
            v-bind:showForm.sync="showForm"
            v-bind:successMessage.sync="successMessage"
            v-bind:scrollTarget= "this.scrollTarget"
        ></AddPc>
        <ListControls 
            v-if="showOptions" 
            target="pc" 
            v-bind:listOptions.sync="listOptions"
            v-bind:selected.sync="selected"
            v-bind:sort.sync="sort"
            v-bind:columnSize.sync="columnSize"
            v-bind:sortDirection.sync="sortDirection"
        />
        <ListPcs 
            v-bind:scrollTarget= "this.scrollTarget"
            v-bind:selected = "this.selected"
            v-bind:sort = "this.sort"
            v-bind:sortDirection = "this.sortDirection"
            v-bind:columnSize = "this.columnSize"
        ></ListPcs>
    </div>
</template>

<script>
// import _ from 'lodash';
import AddPc from '@/components/pc/AddPc.vue';
import ListPcs from '@/components/pc/ListPcs.vue';
import ListControls from '@/components/ui/ListControls.vue';
import CurrentPc from '@/components/pc/CurrentPc.vue';

export default {
    components: {
    AddPc, 
    ListPcs,
    ListControls,
    CurrentPc
    },
    name: "PcContainer",
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
        this.$store.dispatch('loadPcs'),
        this.scrollTarget = this.$refs.scrollHeader
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
    #options{
        min-height: 40px;
    }
</style>
 