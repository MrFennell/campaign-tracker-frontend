<template>
    <div class="container is-fullhd">
        <h2 ref="scrollHeader">Locations:</h2>
        <AddLocation></AddLocation>
        <ListLocations v-bind:scrollTarget= "this.scrollTarget"></ListLocations>
    </div>
</template>

<script>
import AddLocation from '@/components/location/AddLocation.vue';
import ListLocations from '@/components/location/ListLocations.vue';

export default {
    components: {AddLocation,  ListLocations},
    name: "LocationContainer",
    data() {
        return {
            order: '',
            scrollTarget: ''
        }
    },
    mounted() {
        this.$store.dispatch('loadLocations'),
        this.scrollTarget = this.$refs.scrollHeader
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 