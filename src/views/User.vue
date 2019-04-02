<template>
    <div class="content">
        <h1>{{ user.username }}</h1>
        <p>Signed up on {{ user.createdAt }} ({{ user.createdAt | luxon }}, which is {{user.createdAt | luxon:diffForHumans }})</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'user',
    props: ['username'],
    data() {
        return {
            user: {}
        };
    },

    async mounted() {
        const response = await axios.get(`/users/${this.username}`);
        this.user = response.data;
    }
}
</script>

<style>

</style>
