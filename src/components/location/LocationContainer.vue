<template>
    <div class="container is-fullhd">
        <h2>Locations:</h2>
        <AddLocation></AddLocation>
        <ListLocations ></ListLocations>
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
        }
    },
    mounted() {
        this.$store.dispatch('loadLocations')
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 