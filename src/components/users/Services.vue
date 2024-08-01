<script>
import { onMounted, ref } from 'vue';
import axios from '../../Axios';

export default {
  setup() {
    const services = ref([])
    const status = ref(0)
    const page = ref(1)
    const user = ref()

    const getServices = async () => {
      try {
        const response = await axios('/services', {
          headers: user.value,
          params: {
            page: page.value
          }
        })

        if (response.status === 200) {
          status.value = response.status
          services.value = response.data.services
        }
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(() => {
      const authHeaders = localStorage.getItem('authHeaders')
      if (authHeaders) {
        user.value = JSON.parse(authHeaders)
        getServices()
      }
    })

    return {
      user, services, status, page
    }
  }
}
</script>

<template>
  <div v-if="user" class="container py-3 text-center">
    <template v-if="user.role === 'user'">
      <h1>Servicios</h1>
    <div v-if="status === 200" class="table-responsive">
      <table class="table table-hover">
        <thead class="table-info">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services">
            <th>{{ service.id }}</th>
            <td>{{ service.name }}</td>
            <td colSpan="2">
              <router-link :to="`/services/${service.id}/availabilities`" class="btn btn-outline-primary m-1">
                Ver mi disponibilidad
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </template>
    <template v-if="user.role === 'admin'">
      <h1>Servicios</h1>
    <div v-if="status === 200" class="table-responsive">
      <table class="table table-hover">
        <thead class="table-info">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services">
            <th>{{ service.id }}</th>
            <td>{{ service.name }}</td>
            <td colSpan="2">
              <router-link :to="`/services/${service.id}/shifts`" class="btn btn-outline-primary m-1">
                Ver Turnos
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </template>
    <div v-if="status !== 200">Esperando...</div>
  </div>
</template>
