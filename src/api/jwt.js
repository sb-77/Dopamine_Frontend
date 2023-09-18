import { get } from './instanse';

const path = `/api/auth`;

const login = (code) => {
  const redirectUrl = 'https://dopamine-frontend.vercel.app/kakao/callback';
  const reqPath = path + `/login?code=${code}&redirect_url=${redirectUrl}`;
  return get(reqPath);
};

const logout = () => {
  const token = localStorage.getItem('accessToken');
  const reqPath = path + '/logout';
  return get(reqPath, token);
};

export { login, logout };
