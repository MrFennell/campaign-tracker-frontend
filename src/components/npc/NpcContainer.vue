<template>
    <div class="container is-fullhd">
        <h2>Non-Player Characters:</h2>
        <AddNpc></AddNpc>
        <CurrentNpc></CurrentNpc>

        <div class="box">
            <ListNpcs ></ListNpcs>
        </div>
    </div>
</template>

<script>
// import _ from 'lodash';
import AddNpc from '@/components/npc/AddNpc.vue';
import ListNpcs from '@/components/npc/ListNpcs.vue';
import CurrentNpc from '@/components/npc/CurrentNpc.vue';

export default {
    components: {AddNpc, CurrentNpc, ListNpcs},
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
 