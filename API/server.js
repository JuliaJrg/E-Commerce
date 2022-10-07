const express = require("express");
const app = express();
const port = 4242;

/**
 * @api /admin Redirect to Crud Admin for Users
 */
const crudAdminRouter = require("./src/Model/CrudAdmin");
app.use("/admin", crudAdminRouter);

/**
 * @api /user Redirect to Crud Users informations
 */
const crudUserRouter = require("./src/Model/CrudUser");
app.use("/user", crudUserRouter);

/**
 * @api /product Redirect to Users Product and Sales
 */
const crudProductRouter = require("./src/Model/CrudProduct");
app.use("/product", crudProductRouter);

/**
 * @api /admin-product Redirect to Crud Admin for Product and Review
 */
const crudProductAdminRouter = require("./src/Model/CrudProductAdmin");
app.use("/admin-product", crudProductAdminRouter);

/**
 * @api /sale Redirect to Crud Admin for Sales
 */
const crudSaleAdminRouter = require("./src/Model/CrudSaleAdmin");
app.use("/sale", crudSaleAdminRouter);

/**
 * @api /reviews Redirect to Crud Users for Reviews
 */
const crudReviewRouter = require("./src/Model/CrudReview");
app.use("/reviews", crudReviewRouter);

/**
 * @api /cart Redirect to Crud Cart for Users
 */
const crudCartRouter = require('./src/Model/CrudCart')
app.use('/cart', crudCartRouter)

/**
 * @api /bill Redirect to Crud Bill of Users
 */
const crudBillRouter = require('./src/Model/CrudBill')
app.use('/bill', crudBillRouter)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
