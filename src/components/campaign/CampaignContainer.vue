<template>
    <div class="container" id="campaign-container">
        <CurrentCampaign></CurrentCampaign>
        
        <div id="campaign-options" >
            <ul>
                <li><a @click="switchCampaign">Switch</a></li>
                  |  
                 <li><a @click="newCampaign" >Start New</a></li>
                <!-- <li><Logout></Logout></li> -->
            </ul>
        </div>
        <div v-if="chooseCampaign">
            <ListCampaigns></ListCampaigns>
        </div>
        <div v-if="showNewForm">
            <AddCampaign></AddCampaign>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "CampaignContainer",
    data(){
        return{
            chooseCampaign: false,
            showNewForm: false
        }
    },
    components: {
        ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        CurrentCampaign: () => import('@/components/campaign/CurrentCampaign'),
        AddCampaign: () => import('@/components/campaign/AddCampaign'),
        // Logout: () => import('@/components/user/Logout')
    },
    methods: {
        switchCampaign(){
            if (!this.chooseCampaign){
                this.chooseCampaign = true;
                this.showNewForm = false;
            }
            else{
                this.chooseCampaign = false;
            }
        },
        newCampaign(){
            if (!this.showNewForm){
                this.showNewForm = true;
                this.chooseCampaign = false;
            }
            else{
                this.showNewForm = false;
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
    // #campaign-container{
    //     width:100%;
    // }
    #campaign-options {
        display:flex;
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
            // padding: 0.5em 1em;
        }
    }
    // .campaign-nav{
    //     border: 1px solid blue;
    //     height: 20px;
    // }
</style>