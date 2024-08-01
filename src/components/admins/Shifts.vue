<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../../Axios';
import Shift from './Shift.vue';

export default {
  components: Shift,
  setup() {
    const shifts = ref([])
    const status = ref(0)
    const page = ref(1)
    const user = ref()
    const route = useRoute()
    const serviceId = route.params.serviceId

    const getShifts = async () => {
      try {
        const response = await axios.get(`/services/${serviceId}/shifts`, {
          headers: user.value,
          params: {
            page: page.value
          }
        })

        if (response.status === 200) {
          status.value = response.status
          shifts.value = response.data.shifts
        }
      } catch (error) {
        console.error();
      }
    }

    onMounted(() => {
      const authHeaders = localStorage.getItem('authHeaders')
      if (authHeaders) {
        user.value = JSON.parse(authHeaders)
        getShifts()
      }
    })

    return {
      user, shifts, status, page, serviceId
    }
  }
}
</script>

<template>
  <div v-if="user" class="container py-3">
    <router-link to="/services" title="Atrás">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
      </svg>
    </router-link>
    <div class="text-center mb-3">
      <h1>Hojas de turnos</h1>
    </div>
    <div v-if="status === 200" class="table-responsive text-center">
      <table class="table table-hover">
        <thead class="table-info">
          <tr>
            <th>Semana</th>
            <th>Confirmado</th>
            <th>Servicio ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shift in shifts">
            <td>{{ shift.week }}, {{ shift.year }}</td>
            <td>
              <template v-if="shift.confirmed">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle text-success" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                </svg>
              </template>
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </template>
            </td>
            <td>{{ shift.service_id }}</td>
            <td>
              <template v-if="shift.confirmed">
                <span style="margin-left: 5px;">
                  <Shift :shift="shift"></Shift>
                </span>
              </template>
              <template v-else>
                <router-link :to="`/services/${serviceId}/shifts/${shift.id}`" class="btn btn-outline-primary">Programar</router-link>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="status !== 200" class="text-center">Esperando...</div>
  </div>
</template>