<template>
    <div class="container is-fullhd">
        <h2 ref="scrollHeader">Non-Player Characters:</h2>
        <AddNpc></AddNpc>
        <!-- <CurrentNpc></CurrentNpc> -->

        <ListNpcs ></ListNpcs>
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
        }
    },
    mounted() {
        this.$store.dispatch('loadNpcs')
    }
}
</script>
<style lang="scss" scoped>
    .card-hover:hover {
        opacity: 0.7;
    }
</style>
 