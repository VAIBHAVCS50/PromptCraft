import Promptt from "@models/prompt";
import { connectToDB } from "@database";

export const GET = async (request) => {
    try {
        await connectToDB()
        const prompts = await Promptt.find({}).populate('creator')
    
        // console.log(prompts);
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
   
        // console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 