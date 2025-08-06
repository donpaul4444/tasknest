// lib/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions= {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: user.email });

        if (!userExists) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }

        return true;
      } catch (err) {
        console.error("Sign-in error:", err);
        return false;
      }
    },
  },
};