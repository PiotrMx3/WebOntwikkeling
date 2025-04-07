import express from "express";
const router = express.Router();

function mathRouter() {
  function perfmedOperator(operator: string, a: number, b: number) {
    if (!["add", "min", "mult", "div"].includes(operator))
      throw new Error("Unknown operator.");

    if (isNaN(a) || isNaN(b))
      throw new Error("Both query parameters (a,b) have to be of type number.");

    switch (operator) {
      case "add":
        return a + b;

      case "min":
        return a - b;

      case "mult":
        return a * b;

      case "div":
        if (b === 0) {
          throw new Error("Division by 0 is not allowed.");
        }
        return a / b;

      default:
        throw new Error("Unknown operator.");
    }
  }

  router.get("/:operator", (req, res) => {
    const operator: string = req.params.operator;

    if (req.query.a == null || req.query.b == null) {
      return res.json({
        error: "Both query parameters (a,b) have to be specified.",
      });
    }

    const a: number = Number(req.query.a);
    const b: number =
      typeof req.query.b === "string" ? parseFloat(req.query.b) : NaN;

    try {
      const result = perfmedOperator(operator, a, b);
      res.json({
        result,
      });
    } catch (error: any) {
      res.json({
        error: `Error ${error.message}`,
      });
    }
  });
  return router;
}

export default mathRouter;
