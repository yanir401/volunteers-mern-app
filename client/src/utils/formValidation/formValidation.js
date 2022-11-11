export const isFormValid = (fields) => {
  const errors = {};
  if ("name" in fields)
    if (!fields.name.trim()) errors.name = "Full name required";
    else if (fields.name.trim().length < 2)
      errors.name = "Full name must be at least 2 characters";

  if (!fields.email) errors.email = "Email address required";
  //   else if (/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(fields.email))
  //     errors.email = "Invalid email address";

  if (!fields.password) errors.password = "Password required";
  else if (
    /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
      fields.password
    )
  )
    errors.password = "Password weak";

  return errors;
};
