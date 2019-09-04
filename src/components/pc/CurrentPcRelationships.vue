<template>
<div>
    <h4>Relationships</h4>
    <div class="relationships">
        <p>PCs</p>
        <!-- <div class="relationship__list">
            <div v-for="pc in pcRelationships" v-bind:key="pc.id">
                {{pc.Relationship}} {{pc.PcName2}}
                <a @click="deleteRelationship(pc.id)">delete</a>
            </div>
        </div> -->
        <div class="relationship__list">
            <div v-for="pc in pcRelationships" v-bind:key="pc.id">
                <div v-if="pc.PcId === current.id && pc.PcId2 !==null">{{pc.Relationship}} {{pc.PcName2}}
                    <a @click="deleteRelationship(pc.id)">delete</a>
                </div>
                <div v-if="pc.PcId2 === current.id && pc.PcId !==null">{{pc.Relationship}} {{pc.PcName}}
                    <a @click="deleteRelationship(pc.id)">delete</a>
                </div>
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
                <div v-if="npc.PcId === current.id && npc.NpcId !==null">{{npc.Relationship}} {{npc.NpcName}}
                    <a @click="deleteRelationship(npc.id)">delete</a>
                </div>
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
               <div v-if="location.PcId === current.id && location.LocationId !== null">{{location.Relationship}} {{location.LocationName}}
                    <a @click="deleteRelationship(location.id)">delete</a>
               </div>
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
import { mapGetters } from 'vuex'
// import axios from 'axios'
export default {
    name: "CurrentPcRelationships",
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
    watch: {
        current: function(){
            this.selectedPc = '';
            this.selectedNpc = '';
            this.selectedLocation = '';
            this.pcRelationship = null;
            this.npcRelationship = null;
            this.locationRelationship = null;
        }
    },
    methods:{
        addPcPcRelationship(){
            this.$store.dispatch('addPcPcRelationship', {
                pcId:this.current.id,
                pcId2:this.selectedPc.id,
                relationship:this.pcRelationship
            })
            this.selectedPc = null;
            this.pcRelationship = null;
        },
        addPcNpcRelationship(){
            this.$store.dispatch('addPcNpcRelationship', {
                pcId:this.current.id,
                npcId:this.selectedNpc.id,
                relationship:this.npcRelationship
            })
            this.selectedNpc = null;
            this.npcRelationship = null;
        },
        addPcLocationRelationship(){
            this.$store.dispatch('addPcLocationRelationship', {
                pcId:this.current.id,
                locationId:this.selectedLocation.id,
                relationship:this.locationRelationship
            })
            this.selectedLocation = null;
            this.locationRelationship = null;
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