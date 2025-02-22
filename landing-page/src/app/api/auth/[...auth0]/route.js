import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: async (req, res) => {
    return handleLogin(req, res, {
      returnTo: '/platform', // Redirect users to /platform after successful login
    });
  }
});