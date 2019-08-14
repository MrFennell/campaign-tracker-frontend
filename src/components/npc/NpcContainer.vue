<template>
    <div class="container is-fullhd">
        <h2 ref="scrollHeader">Non-Player Characters:</h2>
        <AddNpc></AddNpc>
        <!-- <CurrentNpc></CurrentNpc> -->
        <ListNpcs v-bind:scrollTarget= "this.scrollTarget"></ListNpcs>
    </div>
</template>

<script>
// import _ from 'lodash';
import AddNpc from '@/components/npc/AddNpc.vue';
import ListNpcs from '@/components/npc/ListNpcs.vue';
// import CurrentNpc from '@/components/npc/CurrentNpc.vue';

export default {
    components: {AddNpc,  ListNpcs},
    name: "NpcContainer",
    data() {
        return {
            order: '',
            scrollTarget: ''
        }
    },
    mounted() {
        this.$store.dispatch('loadNpcs'),
        this.scrollTarget = this.$refs.scrollHeader
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 