import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({user, profile}) {
      if (profile) {
        console.log(profile, user)
        return true
      }
    }
  },
  pages: {
    signOut: '/',
    signIn: '/'
  }
})