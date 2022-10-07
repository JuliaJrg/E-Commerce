const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const crudCartRouter = express.Router();
crudCartRouter.use(express.json());
crudCartRouter.use(express.urlencoded({ extended: true }));
crudCartRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {post} / Create Cart for user
 *
 * @apiBody {Int}       id               User id to create the Cart
 * @apiBody {Int}       product_id       Id of product in review
 * @apiBody {Int}       number_product   Number of product in cart
 */
crudCartRouter.post("/", async (req, res) => {
    const unHashedId = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY);
    if (unHashedId) {
        await prisma.cart.create({
            data: {
                users: {
                    connect: {
                        id: parseInt(unHashedId.id),
                    },
                },
                product: {
                    connect: {
                        id: parseInt(req.body.product_id),
                    },
                },
                number_product: parseInt(req.body.number_product),
            },
        });
    }
    res.sendStatus(200);
});

/**
 * @api {get} / Print Cart of User
 *
 * @apiBody    {Int}    user_id          Id of User for print is Cart
 *
 * @apiSuccess {String} product          Return the Name of Product in User Cart
 * @apiSuccess {Int}    number_product   Return the Number of Product
 */
crudCartRouter.get("/", async (req, res) => {
    if (req.headers.authorization) {
        const unHashedId = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY);
        if (unHashedId) {
            const cart = await prisma.cart.findMany({
                where: {
                    users: {
                        id: parseInt(unHashedId.id),
                    },
                },
                include: {
                    product: true,
                },
            });
            res.json(cart);
        } else {
            res.sendStatus(401);
        }
    }
});

/**
 * @api {put} / Update Cart by User
 *
 * @apiBody {Int}       id               Id of Cart for update
 * @apiBody {Int}       number_product   Number of stars to the review
 */
crudCartRouter.put("/", async (req, res) => {
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};
    let array_params = ["number_product"];

    array_body.forEach((element) => {
        if (array_params.includes(element[0])) {
            data_params[element[0]] = parseInt(element[1]);
        }
    });

    await prisma.cart.update({
        where: {
            id: parseInt(req.body.cart_id),
        },
        data: data_params,
    });
    res.sendStatus(200);
});

/**
 * @api {delete} / Delete Cart of User
 *
 * @apiBody {Int}   id    Id of the Cart to Delete
 */
crudCartRouter.delete("/", async (req, res) => {
    await prisma.cart.deleteMany({
        where: {
            id: parseInt(req.body.id),
        },
    });
    res.sendStatus(200);
});

module.exports = crudCartRouter;
