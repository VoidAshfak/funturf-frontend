import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                if (!email || !password) {
                    return null;
                }

                const userFound = users.find(user => user?.email === email);
                if (userFound && userFound.password === password) {
                    const { password, ...rest } = userFound;
                    return rest;
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                token.id = user.id;
                token.role = user.role;
            }
            return token
        },
        async session({ session, user, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session
        },
    },
    pages: {
        signIn: '/login'
    }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

const users = [
    {
        id: '200001',
        name: 'asif',
        email: 'asif@gmail.com',
        password: '123456',
        role: 'admin'
    },
    {
        id: '200002',
        name: 'sadi',
        email: 'sadi@gmail.com',
        password: '123456',
        role: 'player'
    },
    {
        id: '200003',
        name: 'tanzim',
        email: 'tanzim@gmail.com',
        password: '123456',
        role: 'manager'
    }
]