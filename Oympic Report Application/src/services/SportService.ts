import {type Sport } from './../types';
import  { type AxiosResponse } from 'axios'
import apiClient from './AxiosClient';

export default {
    getSports() {
        return apiClient.get('/sports')
    },
    // Save a new event
    saveSport(sport: Sport) {
        return apiClient.post('/sports', sport)
    },
    getSportById(id: number): Promise<AxiosResponse<Sport>> {
        return apiClient.get<Sport>(`/sports/${id}`)
    },
}