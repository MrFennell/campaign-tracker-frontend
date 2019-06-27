<template>
    <a data-cy="router-logout" @click="doLogout">Logout</a>
</template>
<script>
export default {
    name:'Logout',
    methods: {
            doLogout() {
            if (confirm("Are you sure you want to log out?")){
                this.$store.dispatch('logout')
                .then( () => this.$store.dispatch('getCampaigns'))
            }
        }
    }
}
</script>
