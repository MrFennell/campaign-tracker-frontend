<template>
    <div class="content">
        <ul>
            <li v-for="pc in pcs" v-bind:key="pc.id">
                <router-link :to="{ name: 'pc', params: { id: pc.id }}">{{ pc.pcName }}</router-link>
                <p>Name: {{ pc.pcName }}</p>
                <p>Class: {{ pc.pcClass }}</p>
                <p>Race: {{ pc.pcRace }}</p>
                <p>Decription: {{ pc.pcDescription }}</p>
                <!-- <router-link :to="{ name: 'user', params: { username: user.username }}">{{ user.username }}</router-link> -->
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
