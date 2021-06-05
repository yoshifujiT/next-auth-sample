import NextAuth, { CredentialsType, JWT, User } from 'next-auth'
import Providers from 'next-auth/providers'

const isProduction = process.env.NODE_ENV === 'production'
const cookieDomain = process.env.COOKIE_DOMAIN

async function getUser(credentials: {
  userId: string
  password: string
}): Promise<User> {
  // should get user from DB

  return {
    userId: credentials.userId,
  }
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        userId: {
          label: 'user ID',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      // See https://github.com/nextauthjs/next-auth/issues/2080
      async authorize(credentials: CredentialsType) {
        const user = await getUser({
          userId: credentials.userId,
          password: credentials.password,
        })

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      const tokenResult = user
        ? {
            ...token,
            userId: user.userId,
          }
        : token

      return tokenResult
    },
    async session(session, user) {
      return {
        ...session,
        user: {
          ...session.user,
          userId: (user as JWT).userId,
        },
      }
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
        domain: cookieDomain,
      },
    },
  },
})
