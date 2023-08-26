import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@database";
import UserNew from "@models/user";
// console.log({
//     googleClientId: process.env.GOOGLE_ID,
//     googleClientSecret: process.env.GOOGLE_SECRET,
// }
// )
const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        // secret: process.env.NEXTAUTH_SECRET,
      })
    ],
    callbacks: {
      async session({session}){
        // store the user id from MongoDB to session
        try {
          const sessionUser = await UserNew.findOne({ email: session.user.email });
          console.log(sessionUser);
          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
          }
          return session;
        } catch (error) {
          console.error("Error in session callback:", error);
          return session;
        }
     },
     async signIn({profile}){
         try{
               await connectToDB();
               //we are checking if the user exists
                const userExists=await UserNew.findOne({
                 email:profile.email
                });
               //if not , create a new user
               if(!userExists){
                 await UserNew.create({
                     email:profile.email,
                     username:profile.name.replace(" ","").toLowerCase(),
                     image: profile.picture
                 })
               }
               return true;
         }catch(error){
            console.log(error);
            return false;
         }
     },
    }
})

export {handler as GET, handler as POST};