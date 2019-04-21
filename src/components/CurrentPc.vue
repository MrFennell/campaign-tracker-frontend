<template>
        <div class="content" >
            <h2>{{ loadPc.pcName }}</h2>

            <div class="columns is-multiline">
                <!-- <div v-if="!isEditing" class="column is-one-fifth"> -->
                <div class="column is-half">
                    <p v-if="loadPc.playerName">Played by: {{ loadPc.playerName }}</p>
                    <p v-else>Please enter name of player!</p>
                    <p v-if="loadPc.pcClass">Class: {{ loadPc.pcClass }}</p>
                    <p v-else>Class Unknown</p>
                    <p v-if="loadPc.pcRace">Race: {{loadPc.pcRace}}</p>
                    <p v-else>Race Unknown</p>
                    <p v-if="loadPc.pcDescription">Description: {{ loadPc.pcDescription }}</p>
                    <p v-else>No description.</p>
                    <div>
                        <figure class="image is-4by3">
                            <img :src="loadPc.imageSrc" />
                        </figure>
                    </div>
                    <router-link class="subtitle" :to="{ name: 'pc', params: { id: loadPc.id }}">
                        <button>Edit</button>
                    </router-link>
                </div>

            </div>

        </div>
</template>

<script>

export default {
    name: "CurrentPc",
    computed: {
        loadPc(){
            return this.$store.state.pc;
        }
    },
    data() {
        return {
            pc: ''
        }
    }
}

</script>
