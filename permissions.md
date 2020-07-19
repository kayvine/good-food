# Users, Roles & Permissions

Users are the people, roles are their functions, and permissions define what authorizations those functions have.

## :memo: Permissions

Forget about roles when writing code. All you need to know is the permission you need in order to do something.

```javascript
// You need permission to see a list of all users
router.get('/users', hasPermission('GET_USERS'), getAllUsers());

// You need to be the owner or have permission to see your profile
router.get('/users/:id', isOwnerOrHasPermission('GET_USER'), getUserById(req.params.id));
```

> Naming convension: VERB + RESOURCE (+ CONDITION)

Can be stored in JSON format:

```json
{
  "ADMIN": ["GET_USERS", "GET_USER", "EDIT_USER", "DELETE_USER"],
  "EMPLOYEE": ["GET_USER", "EDIT_USER"],
  "USER": []
}
```

```javascript
import Mapping from '../permissions.json';

export const getPermissionFromRole = (role) => Mapping[role] || [];
```

## :oncoming_police_car: Authentication

When authenticating the user we put the permissions on the req.user.

> get user roles => map to permissions => put on token/session/..

```javascript
export const authenticate = async ({ email, password }) => {
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      throw Error('User not found!');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw Error('The provided password is incorrect!');
    }
    delete user.password;
    const payload = {
      ...user,
    };
    // Get permissions from role and add to jwt payload
    payload.permissions = !user.roles === [] ? user.roles.map(getPermissionFromRole) : [];
    return sign(payload, SECRET);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
```

When user is logged in and makes a request, a Bearer token header is send with it.
The permissions which are in the token get put on req.user

```javascript
// ...

// verify token
verify(token, SECRET, (err, decoded) => {
  if (err) {
    res.status(401).send({ message: 'token validation failed' });
  } else {
    req.user = decoded;
    next();
  }
});

// ...
```

## :heavy_check_mark: Validate

Check if user has ownership or permission.

```javascript
export const isOwnerOrHasPermission = (permission) => async (req, res, next) => {
  const id = req.params.id;
  const resource = await fetchResource(id);
  if (resource.createdBy !== req.user._id || !req.user.permissions.includes(permission)) {
    res.status(401).send({ message: 'Does not have correct permissions' });
  } else {
    next();
  }
};
```

## :beginner: More

https://gist.github.com/facultymatt/6370903
