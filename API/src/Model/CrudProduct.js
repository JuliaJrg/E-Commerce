const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");

const prisma = new PrismaClient();
const crudProductRouter = express.Router();
crudProductRouter.use(express.json());
crudProductRouter.use(express.urlencoded({ extended: true }));
crudProductRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {get} / Print all product for Users with filter "category", "brand", "id" or all filter
 * 
 * @apiSuccess {Int}        id                  Id of the Product
 * @apiSuccess {String}     name                Name of the Product
 * @apiSuccess {URL}        img                 URL of img of the Product
 * @apiSuccess {String}     brand               Brand of the Product
 * @apiSuccess {Json}       compatibility       Compatibility of the Product
 * @apiSuccess {Text}       description         Description of the Product
 * @apiSuccess {Text}       details             Details of Product
 * @apiSuccess {Int}        stocks              Stocks of the Product
 * @apiSuccess {Float}      price               Price of the Product
 * @apiSuccess {Int}        category_id         Id of the category product
 * @apiSuccess {Int}        sale_id             Id of the sale on product
 * @apiSuccess {Array}      product_category    All data link with category_id in Product
 * @apiSuccess {Array}      sale                All data link with sale_id in Product
 * @apiSuccess {Array}      review_product      Get first and last name of user link with user_id in review_product
 * @apiSuccess {Int}        nbr_stars           Get notation of product
 * @apiSuccess {String}     comment             Get comment of product
 */
crudProductRouter.get("/", async (req, res) => {
    let query = req.query;
    let array_query = Object.entries(query);
    let params = {};

    array_query.forEach(element => {
        let value_params = ["category", "brand"]
        if (value_params.includes(element[0])) {
            if (element[0] == 'category') {
                params.product_category = { "name": element[1] }
            } 
        } else if (element[0] == 'id') {
            params[element[0]] = parseInt(element[1]);
        } else {
            params[element[0]] = element[1];
        }
    });

    const product = await prisma.product.findMany({
        where: params,
        include: {
            review_product: {
                select: {
                    users: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    },
                    nbr_stars: true,
                    comment: true
                }
            },
            product_category: true,
            sale: true
        }
    });
    res.json(product);
});

/**
 * @api {post} / Id of the Product
 *
 * @apiBody {String} id
 */

crudProductRouter.post("/", (req, res) => {
    const products = req.body.products.map(async (element) => {
        return await prisma.product.findUnique({
            where: {
                id: parseInt(element),
            },
        });
    });

    let totalPrice = 0;
    Promise.all(products).then((product) => {
        product.forEach((element) => {
            totalPrice += element.price;
        });
        res.json({
            total: totalPrice,
            product: product,
        });
    });
});


/**
 * @api {get} /sale Print all Sales for Users
 * 
 * @apiSuccess {Int}        id          Id of Sale
 * @apiSuccess {String}     name        Name of Sale
 * @apiSuccess {Int}        sale_value  Value of Sale in %
 * @apiSuccess {String}     valid_time  Time of validity of Sale
 * @apiSuccess {String}     sale_limit  Limite of validity of Sale
 * @apiSuccess {String}     options     Options of Sale
 * @apiSuccess {Array}                  Array content product in relastionship with Sale
 */
crudProductRouter.get("/sale", async (req, res) => {
    const sales = await prisma.sale.findMany()
    res.json(sales)
})

crudProductRouter.get("/category", async (req, res) => {
    const cat = await prisma.product_category.findMany();
    res.json(cat)
})

module.exports = crudProductRouter;
