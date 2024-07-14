import { ZodError } from "zod";

export const translateFormError = (error: unknown) => {
  if (error instanceof ZodError) {
    return error.errors[0].message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "An unknown error occurred";
  }
};
