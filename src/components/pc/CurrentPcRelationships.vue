<template>
<div>
    <h4>Relationships</h4>
    <div class="relationships">
        <p>PCs</p>
        <div class="relationship__list">
            <div v-for="pc in pcRelationships" v-bind:key="pc.id">
                {{pc.Relationship}} {{pc.PcName2}}
                <a @click="deleteRelationship(pc.id)">delete</a>
            </div>
        </div>
        <div class="relationships__npcs">
            <form class='add_relationship' @submit.prevent="addPcPcRelationship">
                <div class="field is-horizontal">
                    <div class="control">
                        <input v-model="pcRelationship" class="input is-small" type="input" name="npc-relationship" placeholder="Relationship" >
                    </div>
                    <div class="select is-small">
                        <select v-model="selectedPc">
                            <option disabled value="">PC</option>
                            <option v-for="pc in pcs" v-bind:value="pc" v-bind:key="pc.id">
                                {{pc.pcName}}
                            </option>
                        </select>
                    </div>
                    <input type="submit" value="add" class="button is-small">
                </div>
            </form>
        </div>
    </div>
    <div class="relationships">
        <p>NPCs</p>
        <div class="relationship__list">
            <div v-for="npc in npcRelationships" v-bind:key="npc.id">
                {{npc.Relationship}} {{npc.NpcName}}
                <a @click="deleteRelationship(npc.id)">delete</a>
            </div>
        </div>

        <div class="relationships__npcs">
            <form class='add_relationship' @submit.prevent="addPcNpcRelationship">
                <div class="field is-horizontal">
                    <div class="control">
                        <input v-model="npcRelationship" class="input is-small" type="input" name="npc-relationship" placeholder="Relationship" >
                    </div>
                    <div class="select is-small">
                        <select v-model="selectedNpc">
                            <option disabled value="">NPC</option>
                            <option v-for="npc in npcs" v-bind:value="npc" v-bind:key="npc.id">
                                {{npc.name}}
                            </option>
                        </select>
                    </div>
                    <input type="submit" value="add" class="button is-small">
                </div>
            </form>
        </div>
    </div>
    <div class="relationships">
        <p>Locations</p>
        <div class="relationship__list">
            <div v-for="location in locationRelationships" v-bind:key="location.id">
                {{location.Relationship}} {{location.LocationName}}
                <a @click="deleteRelationship(location.id)">delete</a>
            </div>
        </div>
        <div class="relationships__npcs">
            <form class='add_relationship' @submit.prevent="addPcLocationRelationship">
                <div class="field is-horizontal">
                    <div class="control">
                        <input v-model="locationRelationship" class="input is-small" type="input" name="npc-relationship" placeholder="Relationship" >
                    </div>
                    <div class="select is-small">
                        <select v-model="selectedLocation">
                            <option disabled value="">Location</option>
                            <option v-for="location in locations" v-bind:value="location" v-bind:key="location.id">
                                {{location.name}}
                            </option>
                        </select>
                    </div>
                    <input type="submit" value="add" class="button is-small">
                </div>
            </form>
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: "CurrentPcRelationships",
    computed: {
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
        relationships(){
            return this.$store.state.relationships.filter(relationships => relationships.PcId === this.current.id)
        },
        pcRelationships(){
            return this.relationships.filter(relationships => relationships.PcId2 !== null)
        },
        npcRelationships(){
            return this.relationships.filter(relationships => relationships.NpcId !== null)
        },
        locationRelationships(){
            return this.relationships.filter(relationships => relationships.LocationId !== null)
        }
        
    },
    data() {
        return {
            selectedPc:'',
            selectedNpc:'',
            selectedLocation:'',
            pcRelationship: null,
            npcRelationship:null,
            locationRelationship: null,
        }
    },
    methods:{
        addPcPcRelationship(){
            this.$store.dispatch('addPcPcRelationship', {
                pcId:this.current.id,
                pcName:this.current.pcName,
                pcId2:this.selectedPc.id,
                pcName2:this.selectedPc.pcName,
                relationship:this.pcRelationship
            })
            this.selectedPc = null;
        },
        addPcNpcRelationship(){
            this.$store.dispatch('addPcNpcRelationship', {
                pcId:this.current.id,
                pcName:this.current.pcName,
                npcId:this.selectedNpc.id,
                npcName:this.selectedNpc.name,
                relationship:this.npcRelationship
            })
            this.selectedNpc = null;
        },
        addPcLocationRelationship(){
            this.$store.dispatch('addPcLocationRelationship', {
                pcId:this.current.id,
                pcName:this.current.pcName,
                locationId:this.selectedLocation.id,
                locationName:this.selectedLocation.name,
                relationship:this.locationRelationship
            })
            this.selectedLocation = null;
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