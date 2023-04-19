import app from "./api";

// sebaiknya kalo untuk backend pake port selain 3000, karna biasanya ini udah dipake sama frontend
const PORT = process.env.PORT !== undefined ? process.env.PORT : 88;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
