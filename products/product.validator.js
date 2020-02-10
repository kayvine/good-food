export const isValidForCreation = async (req, res, next) => {
    const { name, type, price, estimatedTimeToPrepare } = req.body;
    const errors = [];

    if (!name) {
        errors.push({ level: 'error', code: 'PDT0001', message: 'Name is mandatory' });
    }

    if (!(type === 'food' || type === 'drink')) {
        errors.push({ level: 'error', code: 'PDT0002', message: `Type must be either 'food' or 'drink'` });
    }

    if (!price) {
        errors.push({ level: 'error', code: 'PDT0003', message: 'Price is mandatory' });
    }

    if (!estimatedTimeToPrepare) {
        errors.push({ level: 'error', code: 'PDT0004', message: `A user with email ${email} already exists` });
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        console.log('ProductisValidForCreation!')
        next();
    }
};
