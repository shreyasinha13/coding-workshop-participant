import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export const getEmployees = (params = {}) =>
  api.get('/employees', { params }).then((r) => r.data)

export const createEmployee = (data) =>
  api.post('/employees', data).then((r) => r.data)

export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data).then((r) => r.data)

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`).then((r) => r.data)

export const getHighPerformers = () =>
  api.get('/employees/high-performers').then((r) => r.data)

export const getStats = () =>
  api.get('/employees/stats').then((r) => r.data)

export default api
