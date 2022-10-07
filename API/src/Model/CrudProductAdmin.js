const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");

const prisma = new PrismaClient();
const crudProductAdminRouter = express.Router();
crudProductAdminRouter.use(express.json());
crudProductAdminRouter.use(express.urlencoded({ extended: true }));
crudProductAdminRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {post} / Create product by Admin
 *
 * @apiBody {String}   name            Name of Product
 * @apiBody {URL}      img             URL of Img of Product
 * @apiBody {String}   brand           Brand of Product
 * @apiBody {Json}     compatibility   Compatibility of the Product
 * @apiBody {String}   description     Description of Product
 * @apiBody {Int}      stocks          Stocks of Product
 * @apiBody {Float}    price           Price of Product
 * @apiBody {Int}      category_id     Id of Category product
 */
crudProductAdminRouter.post("/", async (req, res) => {
    await prisma.product.create({
        data: {
            name: req.body.name,
            img: req.body.img,
            brand: req.body.brand,
            compatibility: req.body.compatibility,
            description: req.body.description,
            details: req.body.details,
            stocks: parseInt(req.body.stocks),
            price: parseFloat(req.body.price),
            product_category: {
                connect: {
                    id: parseInt(req.body.category_id)
                }
            }
        },
    });
    res.sendStatus(200);
});

/**
 * @api {put} / Update product by Admin
 *
 * @apiBody {Int}      id              Id of Product
 * @apiBody {String}   name            Name of product
 * @apiBody {String}   img             URL of Img of product
 * @apiBody {String}   brand           Brand of product
 * @apiBody {Json}     compatibility   Compatibility of the Product
 * @apiBody {String}   description     Description of product
 * @apiBody {String}   stocks          Stocks of product
 * @apiBody {Int}      price           Price of product
 */

crudProductAdminRouter.put("/", async (req, res) => {
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};
    let array_params = [
        "name",
        "img",
        "brand",
        "compatibility",
        "description",
        "details",
        "stocks",
        "price",
    ];

    array_body.forEach((element) => {
        if (array_params.includes(element[0])) {
            if (element[0] == "price") {
                data_params[element[0]] = parseFloat(element[1]);
            } else if (
                element[0] == "stocks" ||
                element[0] == "category_id" ||
                element[0] == "sale_id"
            ) {
                data_params[element[0]] = parseInt(element[1]);
            } else {
                data_params[element[0]] = element[1];
            }
        }
    });

    await prisma.product.update({
        where: {
            id: parseInt(req.body.id),
        },
        data: data_params,
    });
    res.sendStatus(200);
});

/**
 * @api {delete} / Delete product by Admin and all relationships
 *
 * @apiBody {Int}      id      Id of product to delete
 */
crudProductAdminRouter.delete("/", async (req, res) => {
    await prisma.product.deleteMany({
        where: {
            id: parseInt(req.body.id),
        },
    });
    res.sendStatus(200);
});

module.exports = crudProductAdminRouter;
