import express, { Request, Response, NextFunction } from 'express'
import { db } from './src/config/db'
import cors from 'cors'
import os from 'os'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.SERVER_PORT || 3000;
import bodyParser from 'body-parser'
import authRoute from './src/app/auth/router'
import doctorRoute from './src/app/doctor/router'
import appointmentRoute from './src/app/appointment/router'
import profileRoute from './src/app/profile/router'
import bloodGroupRoute from './src/app/blood_group/router'
import hospitalRoute from './src/app/hospital/router'
import fileConfigRoute from './src/app/file_config/router'
import contactRoute from './src/app/contact/router'
import axios from 'axios'

db.sync({
    alter: false,
    logging: process.env.SERVER_MODE === "LIVE" ? false : false
}).then((result: any) => {
    console.log('Database Connected Successfully!')
}).catch((err: any) => {
    console.log('Database connection error--->', err);
});

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const attachMacAddress = (): string | null => {
    const networkInterfaces = os.networkInterfaces();

    for (const key in networkInterfaces) {
        for (const net of networkInterfaces[key]!) {
            if (net.mac && net.mac !== "00:00:00:00:00:00") {
                return net.mac;
            }
        }
    }

    return null
};

// Use the middleware in all routes
app.use((req: Request, res: Response, next: NextFunction) => {
    (req as any).user_ip = attachMacAddress();
    next();
});

app.get('/', (req, res) => {
    res.send('🚀 BloodBank Backend is live!');
});

app.get('/healthcheck', (req, res) => {
    res.status(200).send('Service is healthy');
});

setInterval(() => {
    (async () => {
        try {
            const response = await axios.get('https://bloodbank-backend-web.onrender.com/healthcheck');
            console.log('Healthcheck response:', response.data);
        } catch (error) {
            console.error('Error during healthcheck:', error);
        }
    })()
}, 3 * 60 * 1000);


app.use('/file', fileConfigRoute)
app.use('/api/auth', authRoute)
app.use('/api/blood-group', bloodGroupRoute)
app.use('/api/contact', contactRoute)
app.use('/api/hospital', hospitalRoute)
app.use('/api/doctor', doctorRoute)
app.use('/api/blood-group', bloodGroupRoute)
app.use('/api/appointment', appointmentRoute)
app.use('/api/profile', profileRoute)

app.listen(port, () => {
    console.log(`BloodBank Backend Server Running At http://localhost:${port}`);
});