import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (profile) {
        // console.log(profile, user)
        return true
      }
    },
    async jwt({ token, user }) {
      let isUserAdmin = false
      // console.log('============')
      // console.log(token)
      // console.log(user)
      // console.log('============')
      try {
        let find = await client.user.findUnique({
          where: {
            kakao_id: token.id
          },
          select: {
            admin: true
          }
        })
        if (!find) isUserAdmin = false
        if (find.admin) isUserAdmin = true
      } catch (e) {console.error(e)}
      if (token.email == undefined) token.email = null
      if (token.picture == undefined) token.picture = null
      return { ...token, ...user, admin: isUserAdmin }
    },

    async session({ session, token }) {
      // console.log('**********')
      // console.log(session)
      // console.log(token)
      // console.log('**********')
      session.user = token
      if (session.user.email == undefined) session.user.email = null
      if (session.user.image == undefined) session.user.image = null
      // console.log('** ' + JSON.stringify(session))
      return session
    }
  },
  pages: {
    signOut: '/',
    signIn: '/'
  }
}

export default NextAuth(authOptions)