<script>
import axios from '../../Axios';
import { useRouter } from 'vue-router';

export default {
  props: { setUser: Function, user: Object },
  setup(props) {
    const router = useRouter()
    const handleLogout = async () => {
      try {
        const response = await axios.delete('/auth/sign_out', {
          headers: props.user
        })

        if (response.status === 200) {
          localStorage.removeItem('authHeaders')
          props.setUser(null)
          // router.push('/login')
          window.location = '/login'
        }
      } catch (error) {
        console.error(error);
      }
    }

    return {
      props, handleLogout
    }
  }
}


</script>

<template>
  <router-link to="#" class="nav-link" @click.prevent="handleLogout">Logout</router-link>
</template>
