import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: async (req, res) => {
    return handleLogin(req, res, {
      returnTo: '/platform', // Redirect users to /platform after login
    });
  },
  logout: async (req, res) => {
    return handleLogout(req, res, {
      returnTo: '/', // Redirect users to home after logout
    });
  }
});