import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials): Promise<any> {
        console.log({ credentials });
        return { name: 'Alex', email: 'alex@google.com', role: 'admin' };
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // ...add more providers here
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }: any) {
      // console.log({ token, account, user });

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            // TODO: user verification
            break;
          case 'credentials':
            token.user = user;
            break;
        
          default:
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }: any) {
      // console.log({ session, token, user })

      session.accessToken = token.access_token;
      session.user = token.user;

      return session;
    }
  }
}
export default NextAuth(authOptions)