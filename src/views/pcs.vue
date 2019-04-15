<template>
    <div class="content">
        <h2>Player Characters</h2>
                <ul class="list">
                
                    <li v-for="pc in pcs" v-bind:key="pc.id">
                        <div class="card">
                                <router-link :to="{ name: 'pc', params: { id: pc.id }}">{{ pc.pcName }}</router-link>
                                <p>Name: {{ pc.pcName }}</p>
                                <p>Played by: {{ pc.playerName }}</p>
                                <p>Class: {{ pc.pcClass }}</p>
                                <p>Race: {{ pc.pcRace }}</p>
                                <p>Decription: {{ pc.pcDescription }}</p>
                                <p>Image: {{ pc.imageSrc }}</p>
                        </div>
                    </li>
                
                </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'pcs',
    computed: mapState(['pcs']),
    mounted() {
        this.$store.dispatch('getPcs');
    }
}
</script>

<style>

</style>
