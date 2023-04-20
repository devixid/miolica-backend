import { Users } from "@/models";

// handler method get pada profile
const profile = (req, res) => {
  const { username } = req.body;
  // query to get data profile from collection
  const getProfile = async () => {
    const data = await Users.findOne({
      username: {
        $eq: username,
      },
    })
      .populate("Wishlist.productName", "productName")
      .populate("Wishlist.unitPrice", "unitPrice")
      .populate("Wishlist.category", "category")
      .populate(
        "Cart.product_id",
        " productName",
        "descriptionProduct",
        "photoProduct",
        "unitPrice",
        "address",
        "location",
        "QuantityProduct",
      )
      .populate("Cart.product_id.itemCategory", "Category")
      .populate("Cart.product_id.storeName", "storeName");
    return data;
  };
  getProfile();

  // validator jika data ada atau tidak
  if (!getProfile().data) {
    return res
      .json({
        status: false,
        message: "data tidak ditemukan!",
      })
      .status(404);
  }
  return res
    .json({
      status: true,
      message: "data ditemukan",
      data: getProfile().data,
    })
    .status(200);
};
profile();
