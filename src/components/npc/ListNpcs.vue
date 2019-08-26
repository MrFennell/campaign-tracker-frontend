<template>
    <div class="content" id="list-npcs-container">
        <div class="columns is-multiline">
            <ListItem 
                v-for="(npc, index) in loadNpcs"
                v-bind:item = "npc"
                v-bind:index="index"
                v-bind:key="npc.id"
                v-bind:selected="selected"
                v-bind:columnSize="columnSize"
                v-bind:imageFolder="'npcs'"
                v-on:setListItem="setNpc(npc)"
            > </ListItem>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: "ListNpcs",
    props: 
        ['scrollTarget', 'selected', 'sort', 'sortDirection','columnSize']
    ,
    components: {
        ListItem: () => import('@/components/ui/list/ListItem.vue'),
    },
    computed: {
        loadNpcs(){
            let sortDirection = this.sortDirection;
            let npcs = this.$store.state.npcs;
            if (this.sort === 'name'){
                return _.orderBy(npcs, [npc => npc.name.toLowerCase()], sortDirection);
            }
            else if (this.sort === 'createdDate'){
                return _.orderBy(npcs, 'createdAt', sortDirection);
            }
            else{
                 return _.orderBy(npcs, [npc => npc.name.toLowerCase()], sortDirection);
            }
        }
    },
    methods: {
        async setNpc(npc){
            this.$store.dispatch('setNpc', npc)
            this.listOptions = false
            this.$nextTick(() => {
                this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"});
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    #list-npcs-container{
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
 