<template>
<div>
    <h4>Relationships</h4>
    <div class="relationships">
        <p>PCs</p>
        <div class="relationship__list">
            <div v-for="pc in pcRelationships" v-bind:key="pc.id">
                <div v-if="pc.NpcId === current.id && pc.PcId !==null">{{pc.relationship}} {{pc.PcName}}
                    <a @click="deleteRelationship(pc.id)">delete</a>
                </div>
            </div>
        </div>
        <div class="relationships__pcs">
            <CreateRelationship
                v-on:sendrelationship="addPcNpcRelationship"
                v-bind:parentModel="this.current"
                v-bind:selectList="this.pcs"
                defaultListItem="PC"
            />
        </div>
    </div>
    <div class="relationships">
        <p>NPCs</p>
        <div class="relationship__list">
            <div v-for="npc in npcRelationships" v-bind:key="npc.id">
                <div v-if="npc.NpcId === current.id && npc.NpcId2 !==null">{{npc.relationship}} {{npc.NpcName2}}
                    <a @click="deleteRelationship(npc.id)">delete</a>
                </div>
                <div v-if="npc.NpcId2 === current.id && npc.NpcId !==null">{{npc.relationship}} {{npc.NpcName}}
                    <a @click="deleteRelationship(npc.id)">delete</a>
                </div>
            </div>
        </div>
        <div class="relationships__npcs">
           <CreateRelationship
                v-on:sendrelationship="addNpcNpcRelationship"
                v-bind:parentModel="this.current"
                v-bind:selectList="this.npcs"
                defaultListItem="NPC"
            />
        </div>
    </div>
    <div class="relationships">
        <p>Locations</p>
        <div class="relationship__list">
            <div v-for="location in locationRelationships" v-bind:key="location.id">
               <div v-if="location.NpcId === current.id && location.LocationId !== null">{{location.relationship}} {{location.LocationName}}
                    <a @click="deleteRelationship(location.id)">delete</a>
               </div>
            </div>
        </div>

        <div class="relationships__npcs">
            <CreateRelationship
                v-on:sendrelationship="addNpcLocationRelationship"
                v-bind:parentModel="this.current"
                v-bind:selectList="this.locations"
                defaultListItem="Location"
            />
        </div>
    </div>

</div>
</template>

<script>
import CreateRelationship from '@/components/ui/relationships/CreateRelationship.vue'
import { mapGetters } from 'vuex'
export default {
    name: "CurrentPcRelationships",
    components: {CreateRelationship},
    computed: {
        ...mapGetters([
            'PcRelationships',
            'NpcRelationships',
            'LocationRelationships'
        ]),
        current(){
            return this.$store.state.npc
        },
        pcs(){
            return this.$store.state.pcs
        },
        npcs(){
            return this.$store.state.npcs.filter(npcs => npcs.id !== this.current.id)
        },
        locations(){
            return this.$store.state.locations
        },
        pcRelationships(){
            return this.$store.getters.PcRelationships.filter(relationships => 
            relationships.PcId !== null && relationships.NpcId === this.current.id)
        },
        npcRelationships(){
            return this.$store.getters.NpcRelationships.filter(relationships =>
            relationships.NpcId === this.current.id || relationships.NpcId2 === this.current.id)
        },
        locationRelationships(){
            return this.$store.getters.LocationRelationships.filter((relationships => 
            relationships.LocationId !== null && relationships.NpcId === this.current.id))
        }
    },
    methods:{
        addNpcNpcRelationship(relationship, target){
            this.$store.dispatch('addNpcNpcRelationship', {
                npcId:this.current.id,
                npcId2:target.id,
                relationship:relationship
            }) 
        },
        addPcNpcRelationship(relationship, target){
            this.$store.dispatch('addPcNpcRelationship', {
                npcId:this.current.id,
                npcId2:target.id,
                relationship:relationship
            })
        },
        addNpcLocationRelationship(relationship, target){
            this.$store.dispatch('addNpcLocationRelationship', {
                npcId:this.current.id,
                locationId:target.id,
                relationship:relationship
            })
        },
        deleteRelationship(id){
            this.$store.dispatch('deleteRelationship', {
                relationshipId:id
            })
        }
    }
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