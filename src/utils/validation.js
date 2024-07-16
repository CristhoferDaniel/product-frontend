export const validateProduct = (product) => {
  if (!product.name || product.name.trim() === "") {
    return "Product name is required";
  }
  if (product.name.trim().length < 3) {
    return "Product name must be longer than 3 characters";
  }
  if (/^\s/.test(product.name)) {
    return "Product name should not start with a space";
  }
  if (
    product.price === undefined ||
    product.price === null ||
    isNaN(product.price) ||
    product.price <= 0
  ) {
    return "Valid product price is required";
  }
  return null;
};
