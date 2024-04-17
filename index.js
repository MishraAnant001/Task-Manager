import express from 'express'
import router from './routes/task.js'
import connect from './DB/connect.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const port =3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Respond to preflight requests
    } else {
        next();
    }
});
app.use('/api/v1/tasks',router)

app.use(express.json());

app.get('/hello', (req, res)=>{
    res.send("hello user!")
})


const start = async ()=>{
    try {
        await connect(process.env.MONGO_URI)
        console.log("connected to DB...")
        app.listen(port,()=>{
            console.log("server listening on port " + port);
        })
    } catch (error) {
        console.log(error)
    }
}
start()


