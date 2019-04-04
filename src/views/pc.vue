<template>


               <div class="content">
                    <h1>{{pc.pcName }}</h1>
                    <p v-if="pc.pcClass">Class: {{ pc.pcClass }}</p>
                    <p v-else>Class Unknown</p>
                    <p v-if="pc.pcRace">Race: {{pc.pcRace}}</p>
                    <p v-else>Race Unknown</p>
                    <p v-if="pc.pcDescription">Description: {{ pc.pcDescription }}</p>
                    <p v-else>No description.</p>
                    <!-- <p>Signed up on {{ user.createdAt }} ({{ user.createdAt | luxon }}, which is {{user.createdAt | luxon:diffForHumans }})</p> -->

                </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'pc',
    props: ['id'],
    data() {
        return {
            pc: {}
        };
    },

    async mounted() {
        const response = await axios.get(`/pcs/${this.$route.params.id}`);
        this.pc = response.data;
    }
}
</script>

<style>


</style>
