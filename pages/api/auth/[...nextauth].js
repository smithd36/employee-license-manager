import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      // Get the user's Google email
      const email = profile.email;

      // Check if the user's email is in the allowed list
      const allowedEmails = ['dreysmith101@gmail.com', 'piglife60@gmail.com'];
      if (!allowedEmails.includes(email)) {
        // Return false to prevent sign-in
        return false;
      }

      // Allow the user to sign in
      return true;
    },
  },
});