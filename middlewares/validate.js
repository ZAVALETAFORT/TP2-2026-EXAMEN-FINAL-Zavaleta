import AppError from "../errors/AppError.js";

export default function validate(schema, target = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      return next(new AppError(result.error.issues[0].message));
    }
    req[target] = result.data;
    next();
  };
}
