<template>
<div>
    <h4>Relationships</h4>
    <div class="relationships">
        <p>PCs</p>
        <div class="relationship__list">
            <div v-for="pc in pcRelationships" v-bind:key="pc.id">
                <div v-if="pc.PcId === current.id && pc.PcId2 !==null">{{pc.relationship}} {{pc.PcName2}}
                    <a class="relationship-delete" @click="deleteRelationship(pc.id)">delete</a>
                </div>
                <div v-if="pc.PcId2 === current.id && pc.PcId !==null">{{pc.relationship}} {{pc.PcName}}
                    <a class="relationship-delete" @click="deleteRelationship(pc.id)">delete</a>
                </div>
            </div>
        </div>
        <div class="relationships__pcs">
            <CreateRelationship
                v-on:sendrelationship="addPcPcRelationship"
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
                <div v-if="npc.PcId === current.id && npc.NpcId !==null">{{npc.relationship}} {{npc.NpcName}}
                    <a class="relationship-delete" @click="deleteRelationship(npc.id)">delete</a>
                </div>
            </div>
        </div>
        <div class="relationships__npcs">
           <CreateRelationship
                v-on:sendrelationship="addPcNpcRelationship"
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
               <div v-if="location.PcId === current.id && location.LocationId !== null">{{location.relationship}} {{location.LocationName}}
                    <a class="relationship-delete" @click="deleteRelationship(location.id)">delete</a>
               </div>
            </div>
        </div>

        <div class="relationships__npcs">
            <CreateRelationship
                v-on:sendrelationship="addPcLocationRelationship"
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
            return this.$store.state.pc
        },
        pcs(){
            return this.$store.state.pcs.filter(pcs => pcs.id !== this.current.id)
        },
        npcs(){
            return this.$store.state.npcs
        },
        locations(){
            return this.$store.state.locations
        },
        pcRelationships(){
            return this.$store.getters.PcRelationships.filter(relationships => 
            relationships.PcId === this.current.id || relationships.PcId2 === this.current.id)
        },
        npcRelationships(){
            return this.$store.getters.NpcRelationships.filter(relationships => 
            relationships.NpcId !== null && relationships.PcId === this.current.id)
        },
        locationRelationships(){
            return this.$store.getters.LocationRelationships.filter(relationships => 
            relationships.LocationId !== null && relationships.PcId === this.current.id)
        }
        
    },
    methods:{
        addPcPcRelationship(relationship, target){
            this.$store.dispatch('addPcPcRelationship', {
                pcId:this.current.id,
                pcId2:target.id,
                relationship:relationship
            })
        },
        addPcNpcRelationship(relationship, target){
            this.$store.dispatch('addPcNpcRelationship', {
                pcId:this.current.id,
                npcId:target.id,
                relationship:relationship
            })
        },
        addPcLocationRelationship(relationship, target){
            this.$store.dispatch('addPcLocationRelationship', {
                pcId:this.current.id,
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
.relationship-delete{
    float:right;
}
// #currentImage{
//     max-width:200px;
// }

</style>