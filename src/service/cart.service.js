import catchAsync from "@/utils/catchAsync";

export const addCart = catchAsync(async (body) => {
  const { users_id, product_id, quantity, totalPrice } = body;

  const cart = [
    {
      product_id,
      cart_id: new mongoose.Types.ObjectId(),
      quantity,
      totalPrice,
    },
  ];

  try {
    const filter = { users_id };
    const update = { $set: cart };
    await Users.updateOne(filter, update);
    return {
      statusCode: 200,
      status: true,
      message: "cart berhasil ditambahkan",
    };
  } catch (errors) {
    console.log(errors);
    // response server error
    return {
      statuCode: 500,
      status: false,
      message: "cart gagal ditambahkan",
      errors,
    };
  }
});
