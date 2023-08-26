import mongoose from "mongoose";
let isConnected=false;
export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
          dbName: "share_prompt",
          useNewUrLParser: true,
          useUnifiedTopology:true,
        })
        isConnected=true;
        // console.log('MOGO is now connected');
    }
    catch(error){
        console.log(error);
    }
    if(isConnected)
    {
        // console.log('MOGO is Already connected');
        return;
    }
}
