const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const prisma = new PrismaClient();
const crudAdminRouter = express.Router();

crudAdminRouter.use(express.json());
crudAdminRouter.use(express.urlencoded({ extended: false }));
crudAdminRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {get} / Print all users for Admin
 *
 * @apiSuccess      {Int}        Id of the User
 * @apiSuccess      {String}     first-name First name of the User
 * @apiSuccess      {String}     last-name Last name of the User
 * @apiSuccess      {String}     phone Phone number of the User
 * @apiSuccess      {String}     email Email of the User
 * @apiSuccess      {String}     roles Role of the User
 * @apiSuccess      {Array}      user_adress Array of totaly adress of the User
 */
crudAdminRouter.get("/", async (req, res) => {
    const user = await prisma.users.findMany({
        include: {
            user_adress: true,
            cart: true,
            review_product: true,
            user_payment: true,
        },
    });
    res.json(user);
});

/**
 * @api {post} / Print users by id for Admin
 *
 * @apiBody {Int} id User's id for search in table
 *
 * @apiSuccess {Int}        id               Id of the User
 * @apiSuccess {String}     first-name       First name of the User
 * @apiSuccess {String}     last-name        Last name of the User
 * @apiSuccess {String}     phone            Phone number of the User
 * @apiSuccess {String}     email            Email of the User
 * @apiSuccess {String}     roles            Role of the User
 * @apiSuccess {Array}      user_adress      Array of totaly adress of the User
 */
crudAdminRouter.post("/", async (req, res) => {
    const user = await prisma.users.findMany({
        where: {
            id: parseInt(req.body.id),
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            phone: true,
            email: true,
            roles: true,
            user_adress: true,
        },
    });
    res.json(user[0]);
});

/**
 * @api {put} / Update basic user Infos
 *
 * @apiBody     {String}    first-name First name of the User
 * @apiBody     {String}    last-name Last name of the User
 * @apiBody     {String}    email Email of the User
 * @apiBody     {String}    password Password of the User
 * @apiBody     {String}    phone Phone number of the User
 * @apiBody     {String}    roles Role of the User
 */
crudAdminRouter.put("/", async (req, res) => {
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};
    array_body.forEach((element) => {
        const userDataTypes = [
            "first_name",
            "last_name",
            "birthday",
            "email",
            "password",
            "phone",
            "roles",
            "company",
            "siret",
            "pro_verify",
        ];
        if (userDataTypes.includes(element[0])) {
            if (element[0] == "password") {
                data_params[element[0]] = jwt.sign(
                    { password: element[1] },
                    process.env.PRIVATE_KEY,
                    { algorithm: "HS512" }
                );
            } else if (element[0] == "birthday") {
                data_params[element[0]] = new Date(element[1]).toISOString();
            } else if (element[0] == "pro_verify") {
                element[1] == true
                    ? (data_params[element[0]] = 1)
                    : (data_params[element[0]] = 0);
            } else {
                data_params[element[0]] = element[1];
            }
        }
    });

    const response = await prisma.users.update({
        where: {
            id: parseInt(req.body.id),
        },
        data: data_params,
    });

    if (response) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

/**
 * @api {put} /residence Update user adress infos
 *
 * @apiBody     {String}    adress          set Adress to user
 * @apiBody     {String}    city            set City to user
 * @apiBody     {String}    postal_code     set Postal Code to user
 * @apiBody     {String}    country         set Country to user
 */
crudAdminRouter.put("/residence", async (req, res) => {
    if (
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo
            .roles == "admin"
    ) {
        let body = req.body;
        let array_body = Object.entries(body);
        let data_params = {};

        array_body.forEach((element) => {
            const userDataTypes = ["adress", "city", "postal_code"];
            if (userDataTypes.includes(element[0])) {
                data_params[element[0]] = element[1];
            }
        });

        const response = await prisma.user_adress.update({
            where: {
                id: parseInt(req.body.id),
            },
            data: data_params,
        });

        if (response) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    }
});
/**
 * @api {put} /cart Update user adress infos
 *
 * @apiBody     {Int}       id               set Id to cart
 * @apiBody     {Int}       product_id       set ProductID to cart
 * @apiBody     {Int}       number_product   set Nb Product to cart
 */
crudAdminRouter.put("/cart", async (req, res) => {
    if (
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo
            .roles == "admin"
    ) {
        let body = req.body;
        let array_body = Object.entries(body);
        let data_params = {};

        array_body.forEach((element) => {
            const userDataTypes = ["product_id", "number_product"];
            if (userDataTypes.includes(element[0])) {
                data_params[element[0]] = parseInt(element[1]);
            }
        });

        const response = await prisma.cart.update({
            where: {
                id: parseInt(req.body.id),
            },
            data: data_params,
        });

        if (response) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    }
});
/**
 * @api {put} /review Update user adress infos
 *
 * @apiBody     {Int}       id              set Id to product
 * @apiBody     {Int}       product_id      set product_id to product
 * @apiBody     {Int}       nbr_stars       set nbr_stars to product
 * @apiBody     {String}    comment         set Comment to product
 */
crudAdminRouter.put("/review", async (req, res) => {
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};

    array_body.forEach((element) => {
        const userDataTypes = ["product_id", "nbr_stars", "comment"];
        if (userDataTypes.includes(element[0])) {
            if (element[0] != "comment") {
                data_params[element[0]] = parseInt(element[1]);
            } else {
                data_params[element[0]] = element[1];
            }
        }
    });

    const response = await prisma.review_product.update({
        where: {
            id: parseInt(req.body.id),
        },
        data: data_params,
    });

    if (response) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});
/**
 * @api {put} /payment Update user adress infos
 *
 * @apiBody     {Int}       id                 set Id to user
 * @apiBody     {String}    payment_type       set payment_type to user
 * @apiBody     {Float}     total_facture      set total_facture to user
 * @apiBody     {Int}       bill_number        set bill_number to user
 * @apiBody     {String}    delivery           set delivery to user
 */
crudAdminRouter.put("/payment", async (req, res) => {
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};

    array_body.forEach((element) => {
        const userDataTypes = [
            "payment_type",
            "date_purchase",
            "total_facture",
            "bill_number",
            "delivery",
        ];
        if (userDataTypes.includes(element[0])) {
            if (element[0] == "total_facture") {
                data_params[element[0]] = parseFloat(element[1]);
            } else if (element[0] == "bill_number") {
                data_params[element[0]] = parseInt(element[1]);
            } else {
                data_params[element[0]] = element[1];
            }
        }
    });

    const response = await prisma.user_payment.update({
        where: {
            id: parseInt(req.body.id),
        },
        data: data_params,
    });

    if (response) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

/**
 * @api {delete} /residence Delete adress by Admin
 *
 * @apiBody {Int} id Id of the user to delete
 */
crudAdminRouter.delete("/residence", async (req, res) => {
    if (
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo
            .roles === "admin"
    ) {
        await prisma.user_adress.delete({
            where: {
                id: parseInt(req.body.id),
            },
        });
        res.sendStatus(200);
    } else {
        res.status(403).send("You are not an admin");
    }

    res.send([deleteUserAdress]).status(200);
});
/**
 * @api {delete} /cart Delete cart by Admin
 *
 * @apiBody {Int} id Id of the user to delete
 */
crudAdminRouter.delete("/cart", async (req, res) => {
    console.log(jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo.roles);
    if (
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo
            .roles === "admin"
    ) {
        await prisma.cart.delete({
            where: {
                id: parseInt(req.body.id),
            },
        });

        res.sendStatus(200);
    } else {
        res.status(403).send("You are not an admin");
    }
});
/*
 * @api {delete} /review Delete user by Admin
 *
 * @apiBody {Int} id Id of the user to delete
 */
crudAdminRouter.delete("/review", async (req, res) => {
    if (
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo
            .roles === "admin"
    ) {
        await prisma.review_product.delete({
            where: {
                id: parseInt(req.body.id),
            },
        });

        res.sendStatus(200);
    } else {
        res.status(403).send("You are not an admin");
    }

    res.send([deleteReviewProduct]).status(200);
});

/*
 * @api {delete} /payment Delete user by Admin
 *
 * @apiBody {Int} id Id of the user to delete
 */
crudAdminRouter.delete("/payment", async (req, res) => {
    if (
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo
            .roles === "admin"
    ) {
        await prisma.user_payment.delete({
            where: {
                id: parseInt(req.body.id),
            },
        });
        res.sendStatus(200);
    }

    res.send([deleteUserPayment]).status(200);
});
/*
 * @api {delete} / Delete user by Admin
 *
 * @apiBody {Int} id Id of the user to delete
 */
crudAdminRouter.delete("/", async (req, res) => {
    if (
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY).userInfo
            .roles === "admin"
    ) {
        const deleteUser = await prisma.users.delete({
            where: {
                id: parseInt(req.body.id),
            },
        });
        res.send([deleteUser]).status(200);
    } else {
        res.status(403).send("You are not an admin");
    }
});

module.exports = crudAdminRouter;
