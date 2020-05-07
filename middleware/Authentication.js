import { verify } from 'jsonwebtoken';
import { SECRET } from '../config/config';

export default ({ whitelist }) => (req, res, next) => {
  // If route in whitelist skip
  if (whitelist.some((path) => req.path.startsWith(path))) {
    next();
  } else {
    const AuthorizationHeader = req.header('Authorization');

    if (AuthorizationHeader && AuthorizationHeader.split(' ')[1]) {
      const token = AuthorizationHeader.split(' ')[1];

      // verify token
      verify(token, SECRET, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: 'token validation failed' });
        } else {
          console.log(decoded);
          req.user = decoded;
          next();
        }
      });
    } else {
      res
        .status(401)
        .send({ message: 'No authorization header or bearer found' });
    }
  }
};
