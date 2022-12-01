export const isFormValid = (fields) => {
  const errors = {};
  if ("name" in fields)
    if (!fields.name.trim()) errors.name = "Full name required";
    else if (fields.name.trim().length < 2)
      errors.name = "Full name must be at least 2 characters";
  if (!fields.email) errors.email = "Email address required";
  else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      fields.email
    )
  )
    errors.email = "Invalid email address";

  if (!fields.password) errors.password = "Password required";
  else if (fields.password.trim().length < 6)
    errors.password = "Minimum password length 6";
  else if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(
      fields.password
    )
  )
    errors.password =
      "Password Must contain at least one lower case, uppercase, number and special character";

  console.log(fields.password);
  return errors;
};
