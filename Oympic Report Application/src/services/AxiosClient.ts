import axios from "axios";
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyODQ4OTAzMCwiZXhwIjoxNzI4NTc1NDMwfQ.3ADunQ_wysIu75GmqkXZOAKMcSQJwSPdbw9BKJxvxqs"
    }
})
export default apiClient
