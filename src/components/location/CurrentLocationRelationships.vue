<template>
<div>
    <h4>Relationships</h4>
    <div class="relationships">
        <p>PCs</p>
        <div class="relationship__list">
            <div v-for="pc in pcRelationships" v-bind:key="pc.id">
                <div v-if="pc.LocationId === current.id && pc.PcId !==null">{{pc.PcName}} {{pc.relationship}} {{current.name}}.
                    <a @click="deleteRelationship(pc.id)">delete</a>
                </div>
            </div>
        </div>
        <div class="relationships__pcs">
            <CreateRelationship
                v-on:sendrelationship="addPcLocationRelationship"
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
                <div v-if="npc.LocationId === current.id && npc.NpcId !==null"> {{npc.NpcName}} {{npc.relationship}} {{current.name}}.
                    <a @click="deleteRelationship(npc.id)">delete</a>
                </div>
            </div>
        </div>
        <div class="relationships__npcs">
           <CreateRelationship
                v-on:sendrelationship="addNpcLocationRelationship"
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
               <div v-if="location.LocationId === current.id && location.LocationId2 !== null">{{location.relationship}} {{location.LocationName2}}
                    <a @click="deleteRelationship(location.id)">delete</a>
               </div>
               <div v-if="location.LocationId2 === current.id && location.LocationId !== null">{{location.relationship}} {{location.LocationName}}
                    <a @click="deleteRelationship(location.id)">delete</a>
               </div>
            </div>
        </div>

        <div class="relationships__npcs">
            <CreateRelationship
                v-on:sendrelationship="addLocationLocationRelationship"
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
    name: "CurrentLocationRelationships",
    components: {CreateRelationship},
    computed: {
        ...mapGetters([
            'PcRelationships',
            'NpcRelationships',
            'LocationRelationships'
        ]),
        current(){
            return this.$store.state.location
        },
        pcs(){
            return this.$store.state.pcs
        },
        npcs(){
            return this.$store.state.npcs
        },
        locations(){
            return this.$store.state.locations.filter(locations => locations.id !== this.current.id)
        },
        pcRelationships(){
            return this.$store.getters.PcRelationships.filter(relationships => 
            relationships.PcId !== null && relationships.LocationId === this.current.id)
        },
        npcRelationships(){
            return this.$store.getters.NpcRelationships.filter(relationships =>
            relationships.NpcId !== null && relationships.LocationId === this.current.id)
        },
        locationRelationships(){
            return this.$store.getters.LocationRelationships.filter((relationships => 
            relationships.LocationId === this.current.id || relationships.LocationId2 === this.current.id))
        }
    },
    methods:{
        addPcLocationRelationship(relationship, target){
            this.$store.dispatch('addPcLocationRelationship', {
                pcId:target.id,
                locationId:this.current.id,
                relationship:relationship
            })
        },
        addNpcLocationRelationship(relationship, target){
            this.$store.dispatch('addNpcLocationRelationship', {
                npcId:target.id,
                locationId:this.current.id,
                relationship:relationship
            })
        },
        addLocationLocationRelationship(relationship, target){
            this.$store.dispatch('addLocationLocationRelationship', {
                locationId:this.current.id,
                locationId2:target.id,
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