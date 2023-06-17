import { capitalize } from "@/helpers";
import { firebaseError } from "../types";

const errors = (error: firebaseError): string => {
  return capitalize(error.code.split("/")[1].replace('-', ' '));
}

export default errors;