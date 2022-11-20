export const isCreateEventFormValid = (fields) => {
  const errors = {};

  if (!fields.title.trim()) errors.title = "Title required";
  else if (fields.title.trim().length < 2)
    errors.title = "Title must be at least 2 characters";

  if (!fields.description.trim()) errors.description = "Description required";
  else if (fields.description.trim().length < 2)
    errors.description = "Description must be at least 2 characters";

  if (!fields.address.trim()) errors.address = "Address required";
  else if (fields.address.trim().length < 2)
    errors.address = "Address must be at least 2 characters";

  if (!fields.date) errors.date = "Date required";
  else if (new Date(fields.date) < Date.now()) errors.date = "Invalid Date";

  if (!fields.time) errors.time = "Time required";

  return errors;
};
