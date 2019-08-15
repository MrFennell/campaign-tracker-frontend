<template>
    <div>
        <div id="options" class="field is-grouped">
            <div class="field">
                <label>Show: </label>
                <div class="control">
                    <div class="select">
                        <select :value="selected" @input="$emit('update:selected', $event.target.value)">
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                            <option>100</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <!-- Sort fields for PC only due to players being included -->
            <div v-if="target === 'pc'" class="field">
                <label>Sort by: </label>
                <div class="control">
                    <div class="select">
                        <select :value="sort" @input="$emit('update:sort', $event.target.value)" >
                            <option value="name">PC Name</option>
                            <option value="playerName">Player Name</option>
                            <option value="createdDate">Created Date</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div v-else class="field">
                <label>Sort by: </label>
                <div class="control">
                    <div class="select">
                        <select :value="sort" @input="$emit('update:sort', $event.target.value)" >
                            <option value="name">Name</option>
                            <option value="createdDate">Created Date</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="sort-icon" >
                <a v-if="sortDirection === 'asc'" @click="$emit('update:sortDirection', 'desc')" class="icon is-large"><font-awesome-icon icon="sort-up" /></a>
                <a v-if="sortDirection === 'desc'" @click="$emit('update:sortDirection', 'asc')" class="icon is-large"><font-awesome-icon icon="sort-down"  /></a>
            </div>
            <div class="field">
                <label>Thumbnails per row: </label>
                <div class="control">
                    <div class="select" >
                        <select :value="columnSize" @input="$emit('update:columnSize', $event.target.value)" >
                            <option value="column is-one-quarter">4</option>
                            <option value="column is-one-fifth">5</option>
                            <option value="column is-2">6</option>
                            <option value="column is-1">12</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "ListControls",
    props: 
        ['target','selected', 'sort', 'listOptions','columnSize','sortDirection']
}
</script>
<style lang="scss" scoped>
    .list-controls{
        margin-bottom: 1em;
    }
    .list-controls a:first-child{
        padding-right: .5em;
        border-right: 1px solid grey;
    }
    .list-controls a:nth-child(2){
    padding-left: .5em;
    }
    .active{
        text-decoration: underline;
    }
</style>
 