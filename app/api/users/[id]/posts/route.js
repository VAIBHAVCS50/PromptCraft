import Promptt from "@models/prompt";
import { connectToDB } from "@database";

export const GET = async (request,{params}) => {
    try {
        await connectToDB()
        const prompts = await Promptt.find({creator:params.id}).populate('creator')
        console.log("same me daya");
        console.log(prompts);
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log("same me dayaben");
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 