<template>
    <form @submit.prevent="doLogin">
        <p v-if="error" class="has-text-danger has-text-centered">{{ error }}</p>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Username</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" v-model="username"/>
                    </div>
                </div>
            </div>            
        </div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Password</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="password" v-model="password"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <button class="button is-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            error: false
        };
    },
    methods: {
        doLogin() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
            .then(() => this.$router.push('/'))
            .catch(error => this.error = error.response.data.message);
        }
    }
}
</script>
