import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/miolica";

// connection
export const init = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const notif = mongoose.connection;

  // notifikasi
  notif.on("error", () => {
    console.log("Gagal tersambung ke database!");
  });
  notif.once("open", () => {
    console.log("Berhasil tersambung ke database!");
  });
};
