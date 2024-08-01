<script>
import logo from '/vite.svg';
import Logout from './sessions/Logout.vue';
import { onMounted, ref } from 'vue';

export default {
  components: { Logout },
  props: { setUser: Function },
  setup(props) {
    const user = ref()

    onMounted(() => {
      const authHeaders = localStorage.getItem('authHeaders')
      if (authHeaders) {
        user.value = JSON.parse(authHeaders)
      }
    })

    return {
      logo, user, setUser: props.setUser
    }
  }
}

</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand">
          <img :src="logo" class="d-inline-block align-text-top App-logo" alt="logo" style="width: 35px;" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <template v-if="user">
              <li class="nav-item">
                <router-link to="/services" class="nav-link" title="home">Home</router-link>
              </li>
              <li class="nav-item">
                <Logout :setUser="setUser" :user="user"></Logout>
              </li>
              <li class="nav-item">
                <span class="nav-link disabled">{{ user.uid }}</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
