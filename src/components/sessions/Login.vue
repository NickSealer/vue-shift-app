<script>
import { ref } from 'vue';
import axios from '../../Axios';
import { useRouter } from 'vue-router';

export default {
  props: { setUser: Function, user: Object },
  setup(props) {
    const email = ref('')
    const password = ref('')
    const emailRef = ref('email')
    const passwordRef = ref('password')
    const router = useRouter()

    const highlightErrors = (color) => {
      if (emailRef.value) {
        emailRef.value.style.borderColor = color;
      }
      if (passwordRef.value) {
        passwordRef.value.style.borderColor = color;
      }
    }

    const handleLogin = async () => {
      try {
        const response = await axios.post('/auth/sign_in', {
          email: email.value,
          password: password.value
        })

        if (response.status === 200) {
          const authHeaders = {
            'access-token': response.headers['access-token'],
            'token-type': response.headers['token-type'],
            'client': response.headers['client'],
            'expiry': response.headers['expiry'],
            'uid': response.headers['uid'],
            'role': response.data.data.role
          }

          localStorage.setItem('authHeaders', JSON.stringify(authHeaders))
          // props.setUser(authHeaders)
          // router.push('/services')
          window.location = '/services'
        }
        highlightErrors('#dee2e6')
      } catch (error) {
        highlightErrors('red')
        console.error(error);
      }
    }

    return {
      email, password, emailRef, passwordRef, handleLogin
    }
  }
}
</script>

<template>
  <div class="container py-3">
    <template v-if="!user">
      <form class="text-center" @submit.prevent="handleLogin">
        <h2 class="mb-5">Login</h2>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" id="email" name="email" ref="emailRef" type="email" class="form-control" />
          <div class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" id="password" name="password" ref="passwordRef" type="password" class="form-control" />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-success">Login</button>
        </div>
      </form>
    </template>
    <template v-else>
      <div class="alert alert-primary text-center" role="alert">
        You are already logged in!
      </div>
    </template>
  </div>
</template>

