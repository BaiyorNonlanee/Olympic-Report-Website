// import axios from "axios";
// const apiClient = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL,

//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         //Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyODQ4OTAzMCwiZXhwIjoxNzI4NTc1NDMwfQ.3ADunQ_wysIu75GmqkXZOAKMcSQJwSPdbw9BKJxvxqs"
//     }
// })
// export default apiClient
import axios from "axios";

// สร้าง Axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // กำหนด base URL

    headers: {
        Accept: 'application/json', // ยอมรับประเภท JSON
        'Content-Type': 'application/json', // กำหนดประเภทข้อมูลที่ส่งไป
        // อาจไม่ต้องมี Authorization ในทุกคำขอ ถ้ามีให้ uncomment
        // Authorization: `Bearer ${yourToken}` // กำหนด Bearer token ถ้าจำเป็น
    }
});

// ตั้งค่าการตอบกลับสำหรับการดักจับข้อผิดพลาดทั่วไประหว่างการเรียกใช้
apiClient.interceptors.response.use(
    response => response,
    error => {
        // สามารถจัดการกับข้อผิดพลาดที่นี่ เช่น การตรวจสอบสถานะ 401 และรีเซ็ต token
        if (error.response.status === 401) {
            // ตัวอย่าง: ทำการ redirect หรือแสดงข้อความว่าไม่ได้รับอนุญาต
            console.error('Unauthorized access - redirecting to login.');
            // redirect หรือ logic อื่นๆ ที่คุณต้องการ
        }
        return Promise.reject(error); // ส่งต่อข้อผิดพลาด
    }
);

// ตัวอย่างการสร้างฟังก์ชันเพื่อให้ได้ token
function getToken() {
    // คุณสามารถใช้ localStorage หรือ state management เพื่อดึง token
    return localStorage.getItem('token') || '';
}

// ตั้งค่า Authorization header ก่อนที่จะส่งคำขอ
apiClient.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
