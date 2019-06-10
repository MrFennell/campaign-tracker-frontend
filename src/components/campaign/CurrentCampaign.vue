<template>
    <div class="content">
        <h2 >{{ loadCampaign.title }}</h2>
        <p>{{ loadCampaign.description}}</p>
    </div>
</template>

<script>

export default {
    name: "CurrentCampaign",
    computed: {
        loadCampaign(){
            return this.$store.state.campaign;
        },
    },
    data(){
        return{
            title: '',
            description: ''
        }
    }
}

</script>
<style lang="scss">

</style>