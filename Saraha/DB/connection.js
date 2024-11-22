import mongoose, { connect } from "mongoose";
export const connectDB =()=>{
    return mongoose.connect(process.env.DB_LOCAL).then(result=>{
        console.log("Connect Success");
    }).catch(error=>{
        console.log(`Connect Failed ${error}`);
    });
}
