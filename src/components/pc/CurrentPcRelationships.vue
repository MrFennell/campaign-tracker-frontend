<template>
<div>
    <h4>Relationships</h4>
    <div class="relationships">
        <p>Pcs</p>
        <div class="relationships__npcs">
            <form class='add_relationship' @submit.prevent="addPcNpcRelationship">
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
            <div v-for="npc in npcRelationshipList" v-bind:key="npc.id">
                {{npc.Relationship}} {{npc.NpcName}}
                <a @click="deletePcNpcRelationship(npc.id)">delete</a>
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
        <div class="relationships__npcs">
            <form class='add_relationship' @submit.prevent="addPcNpcRelationship">
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
// import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: "CurrentPcRelationships",
    computed: {
        currentPc(){
            return this.$store.state.pc
        },
        pcs(){
            return this.$store.state.pcs
        },
        npcs(){
            return this.$store.state.npcs
        },
        locations(){
            return this.$store.state.locations
        }
    },


    data() {
        return {
            // currentPc:'',
            selectedPc:'',
            selectedNpc:'',
            selectedLocation:'',
            pcRelationship: null,
            npcRelationship:null,
            locationRelationship: null,
            pcRelationshipList: null,
            npcRelationshipList: null,

        }
    },
    watch: {
        currentPc: function(newValue){
            this.npcRelationshipList = null;
            this.getNpcRelationshipList()
        }
    },
    methods:{
        async getNpcRelationshipList(){
            const list = await axios.post('/api/relationships/getPcNpcRelationship',{
                    pcId:this.currentPc.id,
                })
            this.npcRelationshipList = list.data
        },

        async addPcNpcRelationship(){
            const response = await axios.post('/api/relationships/addPcNpcRelationship', {
                pcId:this.currentPc.id,
                pcName:this.currentPc.pcName,
                npcId:this.selectedNpc.id,
                npcName:this.selectedNpc.name,
                relationship:this.npcRelationship
            })
            this.selectedNpc = null;
            this.npcRelationship = null;
            this.npcRelationshipList = response.data;
        },
        async deletePcNpcRelationship(id){
            const response = await axios.post('/api/relationships/deletePcNpcRelationship', {
                pcId:this.currentPc.id,
                relationshipId:id
            })
            this.npcRelationshipList = response.data;
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