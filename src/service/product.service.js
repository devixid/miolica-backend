import catchAsync from "@/utils/catchAsync";
import { Products } from "@/models";
import { productCustomError } from "@/utils/errors";

export const addProduct = catchAsync(async (body, file) => {
  // 1) catch all request data from body and file params into variabel
  const {
    productName,
    descriptionProduct,
    unitPrice,
    address,
    location,
    category,
    quantityProduct,
    storeName,
  } = body;
  const photoProduct = file.path;

  // 2) grap all request variabel into docs
  const addProductDocs = new Products({
    product_id: new mongoose.Types.ObjectId(),
    productName,
    descriptionProduct,
    photoProduct,
    unitPrice,
    address,
    location,
    category,
    quantityProduct,
    storeName,
  });

  // 3) saving docs into collection
  try {
    await addProductDocs.save();
    return {
      statusCode: 200,
      status: true,
      message: "data berhasil diinput",
      product: addProductDocs,
    };
  } catch (err) {
    // 4) validate process if docs failed to save
    const errors = productCustomError(err);

    return {
      statusCode: 400,
      status: false,
      message: "data gagal diinput",
      reason: errors,
    };
  }
});

export const getAllProducts = catchAsync(async () => {
  const option = {
    path: "storeName",
    select: "storeName",
    strictPopulate: false,
  };
  // 1) check if products exist or not
  const products = await Products.find().populate(option);

  // 2) return product not exist
  if (products == null) {
    return {
      statusCode: 404,
      status: false,
      message: "data tidak ditemukan",
    };
  }
  // 3) return if products exist
  return {
    statusCode: 200,
    status: true,
    message: "data ditemukan",
    products,
  };
});

export const getProductById = catchAsync(async (id) => {
  const filter = { product_id: id };
  const option = {
    path: "storeName",
    select: "storeName",
    strictPopulate: false,
  };
  // 1) check if product exist or not
  const product = await Products.findOne(filter).populate(option);

  // 2) return if product not exist
  if (product == null) {
    return {
      statusCode: 404,
      status: false,
      message: `product dengan id ${id} tidak ditemukan`,
    };
  }
  // 3) return if product exist
  return {
    statusCode: 200,
    status: true,
    message: `product dengan id ${id} ditemukan`,
    product,
  };
});

export const getProductByCategories = catchAsync(async (category) => {
  const filter = { category };
  const option = {
    path: "storeName",
    select: "storeName",
    strictPopulate: false,
  };
  // 1) check if products exist or not
  const product = await Products.find(filter).populate(option);

  // 2) return if product not exist
  if (product == null) {
    return {
      statusCode: 404,
      status: false,
      message: `products dengan categories ${category} tidak ditemukan!`,
    };
  }
  // 3) return if product exist
  return {
    statusCode: 200,
    status: true,
    message: `products dengan categories ${category} ditemukan`,
    product,
  };
});

export const updateProductById = catchAsync(async (body, file) => {
  // 1) catch all request data from body and file params into variabel
  const {
    product_id,
    productName,
    descriptionProduct,
    unitPrice,
    address,
    location,
    Category,
    quantityProduct,
  } = body;
  const photoProduct = file.path;
  const filter = { product_id };
  // 2) grap all request variabel into update option
  const update = {
    $set: {
      productName,
      descriptionProduct,
      photoProduct,
      unitPrice,
      address,
      location,
      Category,
      quantityProduct,
    },
  };

  // 3) check if product exist or not
  const findProduct = await Products.findOne(filter);

  // 4) next step if product exist
  if (findProduct) {
    try {
      await Products.findOneAndUpdate(filter, update);
      const updatedProduct = await Products.findOne(filter);
      // 5) return if update product success
      return {
        statusCode: 201,
        status: true,
        message: "Product berhasil diperbarui",
        product: updatedProduct,
      };
    } catch (err) {
      const errors = productCustomError(err);
      // 6) return if update product fail
      return {
        statusCode: 400,
        status: false,
        message: "Product gagal diperbarui",
        errors,
      };
    }
  }
  // 7) return if product not exist
  return {
    statusCode: 404,
    status: false,
    message: "Product tidak ditemukan",
  };
});

export const deleteProductById = catchAsync(async (id) => {
  const filter = { product_id: id };

  // 1) check if product exist or not
  const product = await Products.findOne(filter);

  // 2) next step if product exist
  if (product) {
    try {
      await Products.deleteOne(filter);
      // 3) return if delete product success
      return {
        statusCode: 204,
        status: true,
        message: `product with id ${id} successfully deleted`,
      };
    } catch (errors) {
      console.log(errors);
      // 4) return if delete product fail
      return {
        statusCode: 400,
        status: false,
        message: `failed delete product with id ${id}`,
        errors,
      };
    }
  }

  // 5) return if product not found
  return {
    statusCode: 404,
    status: false,
    message: `product with id ${id} not found!`,
  };
});
