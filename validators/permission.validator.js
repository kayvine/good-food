export const hasPermission = (permission) => (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
        res.status(401).send({ message: 'Does not have correct permissions' });
    } else {
        next();
    }
};