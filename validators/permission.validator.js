export const isOwnerOrHasPermission = (permission, fetchResource) => async (req, res, next) => {
    const id = req.params.id;
    const resource = await fetchResource(id);
    if (resource.createdBy !== req.user._id || !req.user.permissions.includes(permission)) {
        console.debug('req.user._id', req.user._id)
        console.debug('resource.createdBy', resource.createdBy)
        console.log('permission', permission)
        res.status(401).send({ message: 'Does not have correct permissions' });
    } else {
        next();
    }
};