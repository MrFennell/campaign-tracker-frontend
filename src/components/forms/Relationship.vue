<template>
<div>
    <div class="relationships">
        <div class="relationship__list">
            <div v-for="item in list" v-bind:key="item.id">
                {{item.Relationship}} {{item.NpcName}}
                <a @click="this.$emit('deletion'(item.id))">delete</a>
            </div>
        </div>
        <div class="relationships__npcs">
            <form class='add_relationship' @submit.prevent="addPcNpcRelationship">
                <div class="field is-horizontal">
                    <div class="control">
                        <input v-on:input="$emit('update:title', $event.target.value)" class="input is-small" type="input" name="npc-relationship" placeholder="Relationship" >
                    </div>
                    <!-- <div class="select is-small">
                        <select v-model="selectedNpc">
                            <option disabled value="">NPC</option>
                            <option v-for="npc in npcs" v-bind:value="npc" v-bind:key="npc.id">
                                {{npc.name}}
                            </option>
                        </select>
                    </div> -->
                    <input type="submit" value="add" class="button is-small">
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
    name: "Relationship",
    props: ['checked','change','list','title']
    
}

</script>

<style lang="scss">
.npc-r-header{
    margin: 0;
    padding: 0;
}
// #currentImage{
//     max-width:200px;
// }

</style>