import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json';
import User from '../request/user.request';

export const options = {
  stages: [
    { duration: '20s', target: 20 }, 
    { duration: '1m40s', target: 20 }, 
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1000']  
  }
};

export default function () {
  let login = new Login();
  let user = new User();

  group('login and get token', () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass);
  });

  group('list users', () => {
    user.list(login.getToken());
  });
}
