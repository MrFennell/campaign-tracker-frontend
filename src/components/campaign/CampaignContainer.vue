<template>
    <div class="container" id="campaign-container">
        <div>
        <CurrentCampaign></CurrentCampaign>
        </div>
        <div id="campaign-options">
            <div id="campaign-options-links" >
                <ul>
                    <li><a v-bind:class="{ active: isActive  === 'switchLink'}" @click="switchCampaign">Switch</a></li>
                    |  
                    <li><a  v-bind:class="{ active: isActive  === 'startLink'}"  @click="newCampaign" >Start New</a></li>
                </ul>
            </div>
            <div id="campaign-options-body">
                <div v-if="chooseCampaign">
                    <ListCampaigns></ListCampaigns>
                </div>
                <div v-if="showNewForm">
                    <AddCampaign></AddCampaign>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CampaignContainer",
    data(){
        return{
            chooseCampaign: false,
            showNewForm: false,
            isActive: null
        }
    },
    components: {
        ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        CurrentCampaign: () => import('@/components/campaign/CurrentCampaign'),
        AddCampaign: () => import('@/components/campaign/AddCampaign'),
        // Logout: () => import('@/components/user/Logout')
    },
    computed: {
        currentCampaign(){
            return this.$store.state.campaign;
        }
    },
    watch: {
        currentCampaign: function(newValue){
            if(newValue){
                this.chooseCampaign = false;
            }
        }
    },
    methods: {
        switchCampaign(){
            if (!this.chooseCampaign){
                this.chooseCampaign = true;
                this.showNewForm = false;
                this.isActive = 'switchLink';
                
            }
            else{
                this.chooseCampaign = false;
                this.isActive = null;
            }
        },
        newCampaign(){
            if (!this.showNewForm){
                this.showNewForm = true;
                this.chooseCampaign = false;
                this.isActive = 'startLink';
            }
            else{
                this.showNewForm = false;
                this.isActive = null;
            }
        },
        doLogout() {
            if (confirm("Are you sure you want to log out?")){
                this.$store.dispatch('logout')
                .then( () => this.$store.dispatch('getCampaigns'))
            }
        }
    }
}

</script>
<style lang="scss">

#campaign-options-body{
    padding: 0 1.5rem;
}
#campaign-options-links {
    display:flex;
    padding: 0 1.5rem;
    ul{
        display:flex;
        justify-content: center;
        align-items: baseline;
        list-style: none;
        flex-grow: 1;
    }
    ul li:first-child{
        margin-right: 5px;
    }
    ul li:nth-child(2){
        margin-left: 5px;
    }
    li:hover{
        text-decoration: underline;
    }
    a{
        display: block;
        border-radius: 4px 4px 0 0;
        color: black;
        font-size: 0.8em;
    }
    .active{
        text-decoration: underline;
    }
}
</style>