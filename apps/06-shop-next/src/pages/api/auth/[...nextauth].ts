import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { dbUser } from "@/database";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password'}
      },
      async authorize(credentials): Promise<any> {
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        };
        
        return await dbUser.checkUserEmailPassword(credentials?.email || '', credentials?.password || '');
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    // ...add more providers here
  ],

  // Theme
  // theme: {
  //   colorScheme: "auto", // "auto" | "dark" | "light"
  //   brandColor: "#212121", // Hex color code
  //   logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEUAAAD////39/cuLi59fX27u7uXl5eysrKlpaXIyMh3d3fMzMzPz88yMjLy8vJmZmaTk5Pt7e1sbGzl5eUmJiYgICCfn58LCwspKSlFRUVMTEyKiopRUVFxcXFZWVlAQEA8jzF0AAAC/ElEQVR4nO3di3KiQBCF4ZlxN2uio7AL4m3N+79lvFEqEYGatF2nPd8T9F8zXMRInLfOaQ8gjoX4WIiPhfhYiI+F+FiI7/UKA74HhdNsvoojdHE1z6b3CkNWODuKLDQLx9oz/bjxTeFspz2PgN3sUphH7WlExLwuDKX2LELKcC5ca08iZn0qXGjPIWhxKMy1pxCV7ws32kOI2ngXKu0hRFXBvWvPIOzdvWmPIOzNbbVHELZ1Vq/2tdLZPtE4831EREREREQk5DPTnkDYMnjbj66Why+sLCfG0zdydhPPgXYTl3Wg1cR4CbSZeBNoMXHZ/EMca4nLmW+ylRibK2gtMX5fQVuJd7aorcRRW6CVxJYtaifx81GgicTxw0ATiX+YyEQETGQiBCYyEQITmQiBiUyEwEQmQmAiEyEwkYkQmMhECExkIoQXSMw7ElfaA6aadAR+aA+YatoR+Fd7wFTmV9B8YNcW/a89YCrzgea3qPlA85eJrkD4FTS/RbsC4c+i5o/Bl9+i8IHm72TMB5rfouYDzV8meKumPWCql79Vgw98+S0KH8jLhPaAqcxvUfOB5o/Brq9Au1Zw+yvNXLyw/Je2Rbt+odllKl7oqkeJ3XcyqYVPeRt3e2KPWzWIwtbEPmdRjMKWjdrrMoFReD+x32UCpPBeYs8LPUrh92Ox750MTmFjFXt/4MUpvF3F/rdqSIVXqzjgZhup8JI45NMEVGGdOOihE1bhKXHYUzWwwsPpZuAH3tTCiUxHu2Loc9GP32msvy+ViIiIiIiIiIiIiIiIiIiIiIiIiIierdIeQFjlSu0RhJVuqz2CsK0z8Crjh97c0//a/8kmLtg+1VTB+Y32EKI23vlcewhR+b7QL7SnELTwh0K/1p5DzNqfCkOhPYmQIpwLfR61ZxERj+/8Pxb62U57GgG703+Fd+cfwY215/lx9c8C60IfMktHY5EF3yzcm2bzVRyhi6t5dv3WoOvC41LiaxQ1C+1hIT4W4mMhPhbiYyE+FuJjIb4vcn1FCCNJ6vsAAAAASUVORK5CYII=", // Absolute URL to image
  //   buttonText: "#212121" // Hex color code
  // },

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Callbacks
  jwt: {

  },
  session: {
    maxAge: 2592000, // 30 Days
    strategy: "jwt",
    updateAge: 86400, // each day
  },

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = await dbUser.oAuthToDbUser( user.email, user.name )
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
      session.accessToken = token.access_token;
      session.user = token.user;

      return session;
    }
  }
}
export default NextAuth(authOptions)
