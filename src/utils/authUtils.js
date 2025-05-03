import jwt_decode from 'jwt-decode';

export const isTokenExpired = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return true;
  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
};