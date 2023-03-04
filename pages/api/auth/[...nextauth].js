import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME | 'yobulk');
      const alreadyPresent = await db.collection('users').findOne({
        email: user.email,
        name: user.name
      });
      if(!alreadyPresent){
        await db.collection('users').insertOne({
          email: user.email,
        });
      }
      return true
    },
  }
})