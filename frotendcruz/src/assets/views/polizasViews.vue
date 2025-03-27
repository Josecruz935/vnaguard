<template>
  <div>
    <h1>Pólizas</h1>
    <ul>
      <li v-for="policy in policies" :key="policy._id">
        {{ policy.numeroPoliza }} - {{ policy.tipoSeguro }} - {{ policy.titular }} - {{ policy.monto }}
        <button @click="deletePolicy(policy._id)">Eliminar</button>
      </li>
    </ul>
    <form @submit.prevent="createPolicy">
      <input v-model="newPolicy.numeroPoliza" placeholder="Número de Póliza" required />
      <select v-model="newPolicy.tipoSeguro">
        <option>Auto</option>
        <option>Vida</option>
        <option>Hogar</option>
        <option>Salud</option>
      </select>
      <input v-model="newPolicy.titular" placeholder="Titular" required />
      <input v-model="newPolicy.monto" type="number" placeholder="Monto" required />
      <button type="submit">Agregar</button>
    </form>
  </div>
</template>

<script>
import api from '@/plugins/api'; // Asegúrate de que la ruta sea correcta

export default {
  data() {
    return {
      policies: [],
      newPolicy: {
        numeroPoliza: '',
        tipoSeguro: 'Auto',
        titular: '',
        monto: ''
      }
    };
  },
  methods: {
    async fetchPolicies() {
      try {
        const response = await api.get('/api/polizas');
        this.policies = response.data;
      } catch (error) {
        console.error('Error al obtener pólizas:', error);
      }
    },
    async createPolicy() {
      try {
        await api.post('/api/polizas', this.newPolicy);
        this.fetchPolicies();
        this.newPolicy = { numeroPoliza: '', tipoSeguro: 'Auto', titular: '', monto: '' };
      } catch (error) {
        console.error('Error al crear póliza:', error);
      }
    },
    async deletePolicy(id) {
      try {
        await api.delete(`/api/polizas/${id}`);
        this.fetchPolicies();
      } catch (error) {
        console.error('Error al eliminar póliza:', error);
      }
    }
  },
  created() {
    this.fetchPolicies();
  }
};
</script>


  