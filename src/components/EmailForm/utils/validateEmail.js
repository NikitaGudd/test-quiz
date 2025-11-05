export const validateEmail = (value) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!value.trim()) {
    return "Email is required";
  }

  if (!emailRegex.test(value)) {
    return "Please enter a valid email address";
  }

  return "";
};
