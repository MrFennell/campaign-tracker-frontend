<template>
    <div>
    <!-- <a v-if="minimized" @click="minimized = false">+</a> -->
    <form v-if="!minimized" @submit.prevent="sendrelationship">
        <div class="field is-horizontal">
            <div class="control">
                <input v-model="relationshipDesc"
                 class="input is-small" type="input" name="npc-relationship" placeholder="Relationship" >
            </div>
            <div class="select is-small">
                <select v-model="selectedItem">
                    <option disabled value="">{{this.defaultListItem}}</option>
                    <option v-for="item in selectList" v-bind:value="item" v-bind:key="item.id">
                        <span v-if="item.name">{{item.name}}</span>
                        <span v-if="item.pcName">{{item.pcName}}</span> 
                    </option>
                </select>
            </div>
            <input type="submit" value="add" class="button is-small">
            <!-- <a @click="minimized = true">-</a> -->
        </div>
        
    </form>
    </div>
</template>

<script>
export default {
    name: "CreateRelationship",
    props: {
        parentModel: Object,
        defaultListItem: String,
        selectList: Array,
    },
    data() {
        return {
            relationshipDesc: '',
            selectedItem: '',
            minimized: false
        }
    },
    watch: {
        parentModel: function(){
            this.selectedItem = '';
        }
    },
    methods:{
        sendrelationship(){
            this.$emit("sendrelationship", this.relationshipDesc, this.selectedItem),
            this.relationshipDesc = '',
            this.selectedItem = ''
        }
    }
}

</script>

<style lang="scss">
.npc-r-header{
    margin: 0;
    padding: 0;
}

</style>