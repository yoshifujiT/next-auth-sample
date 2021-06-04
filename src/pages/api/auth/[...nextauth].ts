import NextAuth, { CredentialsType, Session } from 'next-auth'
import Providers from 'next-auth/providers'

async function getUser(_credentials: {
  userId: string
  password: string
}): Promise<Session['user']> {
  // should get user from DB

  return {
    userId: 'test',
    name: 'userName',
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
})
