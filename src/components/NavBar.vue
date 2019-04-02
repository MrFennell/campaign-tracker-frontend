<template>
    <div class="tabs is-centered">
        <ul>
            <router-link to="/" tag="li" exact-active-class="is-active" data-cy="router-home">
                <a>Home</a>
            </router-link>
            <router-link to="/users" tag="li" exact-active-class="is-active" data-cy="router-users">
                <a>Users</a>
            </router-link>
            <router-link v-if="!isLoggedIn" to="/register" tag="li" exact-active-class="is-active" data-cy="router-register">
                <a>Register</a>
            </router-link>
            <router-link v-if="!isLoggedIn" to="/login" tag="li" exact-active-class="is-active" data-cy="router-login">
                <a>Login</a>
            </router-link>
            <li v-if="isLoggedIn" data-cy="router-logout"><a @click="doLogout">Logout</a></li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'navbar',
    computed: mapGetters(['isLoggedIn']),
    methods: {
        doLogout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>
