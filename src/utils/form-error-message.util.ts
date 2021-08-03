export const requiredMsg = () => {
  return "This field is required";
};

export const minMsg = (amount: number) => {
  return `This field must have be greater than or equal to ${amount}`;
};

export const maxMsg = (amount: number) => {
  return `This field must have be lesser than or equal to ${amount}`;
};

export const minLengthMsg = (length: number) => {
  return `This field must have atleast ${length} characters long`;
};

export const maxLengthMsg = (length: number) => {
  return `This field must not have more than ${length} characters long`;
};

export const usernameExistsMsg = () => {
  return `This username is already exists`;
};

export const confirmPasswordMsg = () => {
  return "Confirm Password did not matched!";
};
