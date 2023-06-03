import catchAsync from "@/utils/catchAsync";
import { productService } from "@/service";

// handler method post pada products
export const addProduct = catchAsync(async (req, res) => {
  // 1) catch all return from productService addProduct into variabel
  const { statusCode, status, message, product, errors } =
    productService.addProduct(req.body, req.file);

  // 2) validate if status variabel value false
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }

  // 3) response if add success
  return res.status(statusCode).json({
    status,
    message,
    product,
  });
});

// handler method get all pada products
export const getAllProducts = catchAsync(async (req, res) => {
  // 1) catch all return from productService getALLProductS into variabel
  const { statusCode, status, message, products, errors } =
    productService.getAllProducts();

  // 2) validate if status variabel value false
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }

  // 3) response if add success
  return res.status(statusCode).json({
    status,
    message,
    products,
  });
});

// handler get by name pada products
export const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params.id;
  // 1) catch all return from productService getProductById into variabel
  const { statusCode, status, message, product } =
    productService.getProductById(id);

  // 2) validate if status variabel value false
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  // 3) response if add success
  return res.status(statusCode).json({
    status,
    message,
    product,
  });
});

// handler get by categries pada products
export const getProductByCategories = catchAsync(async (req, res) => {
  const { category } = req.params.category;
  // 1) catch all return from productService getProductByCategory into variabel
  const { statusCode, status, message, product } =
    productService.getProductByCategories(category);

  // 2) validate if status variabel value false
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  // 3) response if add success
  return res.status(statusCode).json({
    status,
    message,
    product,
  });
});

// handler method put pada product
export const updateProductById = catchAsync(async (req, res) => {
  // 1) catch all return from productService updateProductById into variabel
  const { statusCode, status, message, product, errors } =
    productService.updateProductById(req.body, req.file);

  // 2) validate if status variabel value false
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }

  // 3) response if add success
  return res.status(statusCode).json({
    status,
    message,
    product,
  });
});

// handler method delete by id pada products
export const deleteProductById = catchAsync(async (req, res) => {
  const { id } = req.params.id;
  // 1) catch all return from productService deleteProductById into variabel
  const { statusCode, status, message, errors } =
    productService.deleteProductById(id);

  // 2) validate if status variabel value false
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }

  // 3) response if add success
  return res.status(statusCode).json({
    status,
    message,
    product,
  });
});
