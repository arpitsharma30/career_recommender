import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',

  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

export async function getCareerRecommendations(formData) {
  try {
     const response = await apiClient.post('/recommend', formData)
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Server error. Please try again.')
    } else if (error.request) {
      throw new Error('Cannot reach server. Make sure Flask is running on port 5000.')
    } else {
      throw new Error('Something went wrong. Please try again.')
    }
  }
}