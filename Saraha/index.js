import dotenv from 'dotenv';
dotenv.config();
import express  from "express";
import { initApp } from "./src/module/app.router.js";
const app = express();
const port =3000;
initApp(app,express);
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})