export const CPath = {
  home: '/',
  login: '/login',
  register: '/register',
  notFound: '*',
  host: process.env.HOST,
  host_public: process.env.HOST + '/medias/',
  host_user: process.env.HOST + '/users/',
  host_messages: process.env.HOST + '/messages/',
  HOST_SOCKET: process.env.HOST_WS,
  baseURL: process.env.HOST + '/api/v1'
};
