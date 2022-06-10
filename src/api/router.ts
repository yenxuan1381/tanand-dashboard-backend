import express from 'express';
import axios from 'axios';
import * as controller from './device';
import * as middleware from './middleware';

const router = express.Router();

// export const api = axios.create({
//     baseURL: "http://localhost:9999",
//     timeout: 5000, // default is `0` (no timeout)
// });

router.use(middleware.logRequest);
router.get('/chart', controller.chartData);
// router.get('/summary', controller.summary);

// const pending = {
//     getStatus: false,
 
// };

// export default {
//     async getStatus({ commit }) {
//     if (pending.getStatus) return;

//     pending.getStatus = true;

//     try {
//         // const { data } = await api.get(`/chart`);

//         commit('setStatus', '1');
//     } catch (e) {
//         console.error('Error performing action getStatus', e);
//     }

//     pending.getStatus = false;
// },





export default router;
