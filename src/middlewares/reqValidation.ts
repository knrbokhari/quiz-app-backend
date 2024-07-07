import { Request, Response, NextFunction } from "express";

interface ValidationError {
  path: (string | number)[];
  message: string;
}

interface ValidationResult {
  error: {
    details: ValidationError[];
  } | null;
}

type ValidateFunction = (body: any) => ValidationResult;

const handleValidations = (validate: ValidateFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validate(req.body);
    const isValid = result.error == null;
    if (isValid) {
      return next();
    }

    const { details } = result.error!;
    const message = details.map((e) => {
      return {
        [e.path[0]]: e.message,
      };
    });
    const msg = Object.assign({}, ...message);

    return res
      .status(400)
      .json({ success: false, message: "Invalid request body", errors: msg });
  };
};

export default handleValidations;
