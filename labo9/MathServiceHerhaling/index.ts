import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

// function mathService(a: number, b: number, operation: string): number {
//   if (isNaN(a) || isNaN(b))
//     throw new Error("Both query parameters (a,b) have to be of type number.");

//   let result: number = 0;
//   const operator = operation.toLowerCase();

//   switch (operator) {
//     case "add":
//       result = a + b;
//       break;
//     case "min":
//       result = a - b;
//       break;
//     case "mult":
//       result = a * b;
//       break;
//     case "div":
//       if (b === 0) throw new Error("Division by 0 is not allowed.");
//       result = a / b;
//       break;

//     default:
//       throw new Error("Unknown operator.");
//   }

//   return result;
// }

// app.get("/:operation", (req, res) => {
//   const operator: string = req.params.operation;
//   const numA: string | undefined =
//     typeof req.query.a === "string" ? req.query.a : undefined;
//   const numB: string | undefined =
//     typeof req.query.b === "string" ? req.query.b : undefined;

//   try {
//     if (numA === undefined || numB === undefined)
//       throw new Error("Both query parameters (a,b) have to be specified.");

//     const result: number = mathService(
//       parseInt(numA),
//       parseInt(numB),
//       operator
//     );
//     res.json({
//       Result: result,
//     });
//   } catch (error) {
//     if (error instanceof Error)
//       res.json({
//         Error: error.message,
//       });
//   }
// });

function mathService(operator: string, numA: number, numB: number): number {
  if (isNaN(numA) || isNaN(numB))
    throw new Error("Both query parameters (a,b) have to be of type number.");

  const op = operator.toLowerCase();
  let result: number = 0;

  switch (op) {
    case "add":
      result = numA + numB;
      break;
    case "min":
      result = numA - numB;
      break;
    case "mult":
      result = numA * numB;
      break;

    case "div":
      if (numB === 0) throw new Error("Division by 0 is not allowed.");
      result = numA / numB;
      break;

    default:
      throw new Error("Unknown operator.");
  }

  return result;
}

app.get("/:operation", (req, res) => {
  const operator = req.params.operation;
  const a: string | undefined =
    typeof req.query.a === "string" ? req.query.a : undefined;
  const b: string | undefined =
    typeof req.query.b === "string" ? req.query.b : undefined;

  try {
    if (a === undefined || b === undefined)
      throw new Error("Both query parameters (a,b) have to be specified.");

    let result = mathService(operator, parseInt(a), parseInt(b));

    res.json({ Result: result });
  } catch (error) {
    if (error instanceof Error) res.json({ Error: error.message });
  }
});

app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
