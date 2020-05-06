# Users, Roles & Permissions

Users are the people, roles are their functions, and permissions define what authorizations those functions have.

## Permissions

Forget about roles when writing code
All you need to know is the permission you need to do something.

```javascript
router.post('/users', isValidForCreation, createUser(req.user, req.body)
```

Naming convension: VERB + RESOURCE + CONDITION

Can be stored in JSON format:

```json
{
  "ADMIN": ["GET_USER", "EDIT_USER", "DELETE_USER"],
  "EMPLOYEE": ["GET_USER"],
  "USER": []
}
```

## :oncoming_police_car: Authentication

When authenticating the user we put the permissions on the req.user.

> get user roles => map to permissions =>

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
    payload.permissions =
      !user.roles === [] ? user.roles.map(getPermissionFromRole) : [];
    return sign(payload, SECRET);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
```

## Forget about roles when writing code

All you need to know is the permission you need to do something.

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);
```
