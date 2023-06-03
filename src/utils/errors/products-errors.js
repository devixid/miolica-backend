const productCustomError = (err) => {
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
