import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  next()
};
export default validateResult;
