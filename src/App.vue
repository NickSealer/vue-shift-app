<script setup>
  import { ref } from 'vue';

  const user = ref()
  const setUser = (newUser) => {
    user.value = newUser
  }
</script>

<template>
  <router-view :setUser="setUser" :user="user"></router-view>
</template>

