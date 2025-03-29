<template>
  <div class="container">
    <h1 class="title">Pólizas</h1>
    
    <button class="load-btn" @click="fetchPolicies">Cargar Datos</button>

    <ul class="policy-list">
      <li v-for="policy in policies" :key="policy._id" class="policy-item">
        <div class="policy-details">
          <strong>{{ policy.numeroPoliza }}</strong> - {{ policy.tipoSeguro }} - {{ policy.titular }} - ${{ policy.monto }}
        </div>
        <div class="buttons">
          <button class="edit-btn" @click="editPolicy(policy)">Editar</button>
          <button class="delete-btn" @click="deletePolicy(policy._id)">Eliminar</button>
        </div>
      </li>
    </ul>

    <form @submit.prevent="createPolicy" class="policy-form">
      <input v-model="newPolicy.numeroPoliza" placeholder="Número de Póliza" required />
      <select v-model="newPolicy.tipoSeguro">
        <option>Auto</option>
        <option>Vida</option>
        <option>Hogar</option>
        <option>Salud</option>
      </select>
      <input v-model="newPolicy.titular" placeholder="Titular" required />
      <input v-model="newPolicy.monto" type="number" placeholder="Monto" required />
      <button type="submit" class="submit-btn">Agregar</button>
    </form>

    <!-- Modal para editar póliza -->
    <div v-if="editMode" class="modal">
      <div class="modal-content">
        <h2>Editar Póliza</h2>
        <form @submit.prevent="updatePolicy">
          <input v-model="editPolicyData.numeroPoliza" required />
          <select v-model="editPolicyData.tipoSeguro">
            <option>Auto</option>
            <option>Vida</option>
            <option>Hogar</option>
            <option>Salud</option>
          </select>
          <input v-model="editPolicyData.titular" required />
          <input v-model="editPolicyData.monto" type="number" required />
          <div class="modal-buttons">
            <button type="submit" class="update-btn">Actualizar</button>
            <button @click="editMode = false" class="cancel-btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/plugins/api';

export default {
  data() {
    return {
      policies: [],
      newPolicy: {
        numeroPoliza: '',
        tipoSeguro: 'Auto',
        titular: '',
        monto: ''
      },
      editMode: false,
      editPolicyData: {}
    };
  },
  methods: {
    async fetchPolicies() {
      try {
        const response = await api.get('/polizas');
        this.policies = response.data;
      } catch (error) {
        console.error('Error al obtener pólizas:', error);
      }
    },
    async createPolicy() {
      try {
        await api.post('/polizas', this.newPolicy);
        this.fetchPolicies();
        this.newPolicy = { numeroPoliza: '', tipoSeguro: 'Auto', titular: '', monto: '' };
      } catch (error) {
        console.error('Error al crear póliza:', error);
      }
    },
    async deletePolicy(id) {
      try {
        await api.delete(`/polizas/${id}`);
        this.fetchPolicies();
      } catch (error) {
        console.error('Error al eliminar póliza:', error);
      }
    },
    editPolicy(policy) {
      this.editPolicyData = { ...policy };
      this.editMode = true;
    },
    async updatePolicy() {
      try {
        await api.put(`/polizas/${this.editPolicyData._id}`, this.editPolicyData);
        this.fetchPolicies();
        this.editMode = false;
      } catch (error) {
        console.error('Error al actualizar póliza:', error);
      }
    }
  },
  created() {
    this.fetchPolicies();
  }
};
</script>
<style scoped>
/* Asegurar que la página cubra toda la pantalla */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: radial-gradient(circle at center, #001f3f, #000814, #000000);
  color: white;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Efecto de estrellas animadas */
@keyframes stars {
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
}

.stars {
  position: fixed;
  width: 100%;
  height: 200%;
  background: url('https://www.transparenttextures.com/patterns/stardust.png');
  opacity: 0.7;
  animation: stars 40s linear infinite;
}

/* Contenedor principal */
.container {
  width: 90%;
  max-width: 800px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

/* Título con efecto de neón */
.title {
  font-size: 32px;
  text-shadow: 0 0 15px #00d4ff, 0 0 30px #00d4ff;
}

/* Botones futuristas */
button {
  padding: 12px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
  transition: 0.3s;
  font-size: 16px;
  text-transform: uppercase;
  color: black;
}

.load-btn, .submit-btn, .update-btn {
  background-color: #00d4ff;
  box-shadow: 0 0 15px #00d4ff;
}
.load-btn:hover, .submit-btn:hover, .update-btn:hover {
  background-color: #008cff;
  box-shadow: 0 0 25px #008cff;
}

.edit-btn {
  background-color: #ffbb00;
  box-shadow: 0 0 15px #ffbb00;
}
.edit-btn:hover {
  background-color: #ff8800;
  box-shadow: 0 0 25px #ff8800;
}

.delete-btn {
  background-color: #ff004c;
  color: white;
  box-shadow: 0 0 15px #ff004c;
}
.delete-btn:hover {
  background-color: #d40040;
  box-shadow: 0 0 25px #d40040;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  box-shadow: 0 0 15px #6c757d;
}
.cancel-btn:hover {
  background-color: #495057;
  box-shadow: 0 0 25px #495057;
}

/* Formulario */
.policy-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin: auto;
}

input, select {
  padding: 10px;
  border: 1px solid #00d4ff;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #0d1b2a;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 20px #00d4ff;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>


