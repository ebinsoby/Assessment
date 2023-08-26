<template>
    <div class="login-container">
        <div class="card">
            <div class="card-header mcap-card-header-primary">{{$t('Login')}}</div>
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">{{$t('Username')}} :</label>
                        <input v-model="username" type="text" class="form-control" id="username" required />
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">{{$t('Password')}}:</label>
                        <input v-model="password" type="password" class="form-control" id="password" required />
                    </div>

                    <button type="submit" class="btn btn-primary mcap-btn-primary">{{$t('Login')}}</button>
                </form>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useLoginDetails } from '@/stores/login'

const userStore = useLoginDetails()
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const login = () => {
    // Simulate authentication logic
    if (username.value === 'admin' && password.value === 'password') {
        errorMessage.value = '';
        // Redirect to the dashboard or another page upon successful login.
        userStore.toggleLogin()
    } else {
        errorMessage.value = 'Invalid username or password.';
    }
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.card {
    width: 300px;
}

.card-header {
    background-color: #007bff;
    color: white;
    text-align: center;
    padding: 10px;
}

.card-body {
    padding: 20px;
}
</style>
  