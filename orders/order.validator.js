export const isValidForCreation = async (req, res, next) => {
  const {} = req.body;
  const errors = [];

  if (errors.length > 0) {
    res.status(400).send(errors);
  } else {
    console.log('isValidForCreation!');
    next();
  }
};
