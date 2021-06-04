import { NextApiRequest } from 'next'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string
    }
  }

  interface User {
    userId: string
  }

  interface JWT {
    userId: string
  }

  // See https://github.com/nextauthjs/next-auth/issues/2080
  type CredentialsType = {
    userId: string
    password: string
  }
}
