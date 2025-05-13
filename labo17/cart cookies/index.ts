import express, {Express} from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

app.set("port", process.env.PORT || 3000);

const products: string[] = [
  "Twix",
  "Mars",
  "Snickers",
  "Bounty",
  "Milky Way",
  "Kinder Bueno",
];

interface Cart {
  [key: string]: number;
}

app.get("/", (req, res) => {
  const cart: Cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : {};

  res.render("index", {
    products: products,
    cart: cart,
  });
});

app.post("/add", (req, res) => {
  const product: string = req.body.product ? req.body.product : undefined;
  const cart: Cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : {};

  if (product) {
    const newQnty = (cart[product] ?? 0) + 1;
    cart[product] = newQnty;

    res.cookie("cart", JSON.stringify(cart), {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
  }
  res.redirect("/");
});

app.post("/remove", (req, res) => {
  const product: string = req.body.product ? req.body.product : undefined;
  const cart: Cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : {};

  if (product) {
    const newQnty = cart[product] ? cart[product] - 1 : 0;
    cart[product] = newQnty;

    res.cookie("cart", JSON.stringify(cart), {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
  }

  res.redirect("/");
});

app.post("/clear", (req, res) => {
  res.clearCookie("cart");
  res.redirect("/");
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
