<template>
    <div v-if="this.scrollTarget != ''" class="content" id="list-pcs-container"> 
        <div class="columns is-multiline">
            <ListItem 
                v-for="(pc, index) in loadPcs"
                v-bind:item = "pc"
                v-bind:index="index"
                v-bind:key="pc.id"
                v-bind:selected="selected"
                v-bind:columnSize="columnSize"
                v-bind:imageFolder="'pcs'"
                v-on:setListItem="setPc(pc)"
            > </ListItem>
        </div>
    </div>
</template>

<script>

import _ from 'lodash';
export default {
    name: "ListPcs",
    props: 
        ['scrollTarget', 'selected', 'sort', 'sortDirection','columnSize']
    ,components: {
        ListItem: () => import('@/components/ui/list/ListItem.vue'),
    },
    computed: {
        loadPcs(){
            let sortDirection = this.sortDirection;
            let pcs = this.$store.state.pcs;
            if (this.sort === 'name'){
                return _.orderBy(pcs, [pc => pc.name.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'playerName'){
                return _.orderBy(pcs, [pc => pc.playerName.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'createdDate'){
                return _.orderBy(pcs, 'createdAt', sortDirection);
            }
            else{
                 return _.orderBy(pcs, [pc => pc.name.toLowerCase()], sortDirection);
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
 