<template>
<form @submit.prevent="submitRegistration">
    <div class="field is-horizontal">
        <div class="field-label">
            <label class="label">Username</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input :class="{ input: true, 'is-danger': showUsernameError }" type="text" v-model="username"/>
                </div>
                <p v-show="showUsernameError" class="help is-danger">Username is not available</p>
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
                    <input :class="{ input: true, 'is-danger': passwordsDoNotMatch }" type="password" v-model="password"/>
                </div>
                <p v-show="passwordsDoNotMatch" class="help is-danger">Passwords do not match</p>
            </div>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-label">
            <label class="label">Password Confirm</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input :class="{ input: true, 'is-danger': passwordsDoNotMatch }" type="password" v-model="password_confirm"/>
                </div>
            </div>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <button :disabled="!canRegister" class="button is-primary">Register</button>
                </div>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

export default {
    name: 'register',
    data() {
        return {
            usernameIsAvailable: false,
            checkingUsername: false,
            username: '',
            password: '',
            password_confirm: ''
        }
    },

    computed: {
        passwordsDoNotMatch() {
            return this.password !== this.password_confirm;
        },

        showUsernameError() {
            return this.username && !this.checkingUsername && !this.usernameIsAvailable;
        },

        canRegister() {
            return this.username &&
                this.usernameIsAvailable &&
                this.password && this.password_confirm &&
                !this.passwordsDoNotMatch;
        }
    },

    watch: {
        username: _.debounce(function () {
            this.isUsernameAvailable();
        }, 500)
    },

    methods: {
        async isUsernameAvailable() {
            this.checkingUsername = true;
            const response = await axios.post('/users/username-is-available', { username: this.username })
            this.checkingUsername = false;
            this.usernameIsAvailable = response.data;
        },

        async submitRegistration() {
            await this.$store.dispatch('register', {
                username: this.username,
                password: this.password,
                password_confirm: this.password_confirm
            });
            this.$router.push('/');
        }
    }
}
</script>