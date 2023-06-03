export const authCustomError = (err) => {
  console.log(err.message, err.code);
  const errors = {
    username: "",
    email: "",
    password: "",
    name: "",
    address: "",
  };

  // email error
  if (err.message === "Email incorrect") {
    errors.email = "Email not registered";
  }

  // password error
  if (err.message === "Password incorrect") {
    errors.password = "incorrect password";
  }

  // duplicate error message
  if (err.code === 11000) {
    errors.email =
      "This email has already been registered, please use another email";
    return errors;
  }

  // validation error message
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export const productCustomError = (err) => {
  console.log(err.message, err.code);

  const errors = {
    productName: "",
    descriptionProduct: "",
    photoProduct: "",
    unitPrice: "",
    address: "",
    location: "",
    Category: "",
    QuantityProduct: "",
    storeName: "",
  };

  // validation error message
  if (err.message.includes("Products validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
