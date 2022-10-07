const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const prisma = new PrismaClient();
const crudUserRouter = express.Router();

crudUserRouter.use(express.json());
crudUserRouter.use(express.urlencoded({ extended: false }));
crudUserRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {get} / User getting
 *
 * @apiBody {String} id Id of the current User
 */
crudUserRouter.get("/", async (req, res) => {
    if (req.headers.authorization) {
        const unHashedId = jwt.verify(
            req.headers.authorization,
            process.env.PRIVATE_KEY
        );
        if (unHashedId.id) {
            const user = await prisma.users.findUnique({
                where: { id: unHashedId.id },
                include: {
                    user_adress: true,
                    user_payment: true,
                    review_product: true,
                    cart: true,
                },
            });
            res.status(200).json(user);
        }
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

/**
 * @api {post} /sign User Singin
 *
 * @apiBody {String} first_name First name of new User
 * @apiBody {String} last_name Last name of new User
 * @apiBody {Date} birthday Birthday of new User
 * @apiBody {String} phone Phone of new User
 * @apiBody {String} email Email of new User
 * @apiBody {String} password Password of new User
 * @apiBody {String} roles Role of new User
 * @apiBody {String} adress Adress of new User
 * @apiBody {String} city City of new User
 * @apiBody {String} postal_code Postal code of new User
 * @apiBody {String} country Country of new User
 */
crudUserRouter.post("/sign", async (req, res) => {
    const user = await prisma.users.findMany({
        where: {
            email: req.body.email,
        },
    });
    const hashedPassword = jwt.sign(
        { password: req.body.password },
        process.env.PRIVATE_KEY,
        { algorithm: "HS512" }
    );
    if (user.length == 0) {
        const createUser = await prisma.users.create({
            data: {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                birthday: new Date(req.body.birthday).toISOString(),
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPassword,
                roles: "admin",
                company: req.body.companyName,
                siret: req.body.siretCode,
            },
        });
        res.status(200).send(
            jwt.sign(
                {
                    userInfo: {
                        id: jwt.sign(
                            { id: createUser.id },
                            process.env.PRIVATE_KEY,
                            {
                                algorithm: "HS512",
                            }
                        ),
                        firstname: createUser.first_name,
                        lastname: createUser.last_name,
                        phone: createUser.phone,
                        email: createUser.email,
                        roles: createUser.roles,
                    },
                },
                process.env.PRIVATE_KEY,
                { algorithm: "HS512" }
            )
        );
    } else {
        res.sendStatus(409);
    }
});

/**
 * @api {post} /login User Login
 *
 * @apiBody {String}        email           Email of User
 * @apiBody {String}        password        Password of User
 *
 * @apiSuccess {String}     first_name      First name of User
 * @apiSuccess {String}     last_name       Last name of User
 * @apiSuccess {Date}       birthday        Birthday of User
 * @apiSuccess {String}     phone           Phone of User
 * @apiSuccess {String}     email           Email of User
 * @apiSuccess {String}     password        Password of User
 * @apiSuccess {String}     roles           Role of User
 * @apiSuccess {String}     adress          Adress of User
 * @apiSuccess {String}     city            City of User
 * @apiSuccess {String}     postal_code     Postal code of User
 * @apiSuccess {String}     country         Country of User
 */
crudUserRouter.post("/login", async (req, res) => {
    const verifyUser = await prisma.users.findMany({
        where: {
            email: req.body.email,
        },
        select: {
            password: true,
        },
    });
    if (verifyUser.length > 0) {
        if (
            jwt.verify(verifyUser[0]["password"], process.env.PRIVATE_KEY)
                .password == req.body.password
        ) {
            const user = await prisma.users.findMany({
                where: {
                    email: req.body.email,
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    phone: true,
                    email: true,
                    roles: true,
                },
            });
            user[0]["id"] = jwt.sign(
                { id: user[0]["id"] },
                process.env.PRIVATE_KEY,
                {
                    algorithm: "HS512",
                }
            );
            res.send(
                jwt.sign(
                    {
                        userInfo: user[0],
                    },
                    process.env.PRIVATE_KEY,
                    {
                        algorithm: "HS512",
                    }
                )
            );
        } else {
            res.sendStatus(404);
        }
    }
});

/**
 * @api {put} / Update user basic info (first name, last name, email, password & phone).
 *
 * @apiBody     {Int}       id           Id of User
 * @apiBody     {String}    first_name   New First name of User
 * @apiBody     {String}    last_name    New Last name of User
 * @apiBody     {String}    email        New Email of User
 * @apiBody     {String}    password     New Password of User
 * @apiBody     {String}    phone        New Phone of User
 */

crudUserRouter.put("/", async (req, res) => {
    if (jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)) {
        const unHashedId = jwt.verify(
            req.headers.authorization,
            process.env.PRIVATE_KEY
        );
        let body = req.body;
        let array_body = Object.entries(body);
        let data_params = {};

        array_body.forEach((element) => {
            const userDataTypes = [
                "first_name",
                "last_name",
                "email",
                "password",
                "phone",
            ];
            if (userDataTypes.includes(element[0])) {
                if (element[0] == "password") {
                    data_params[element[0]] = jwt.sign(
                        { password: element[1] },
                        process.env.PRIVATE_KEY,
                        { algorithm: "HS512" }
                    );
                } else {
                    data_params[element[0]] = element[1];
                }
            }
        });

        const response = await prisma.users.update({
            where: {
                id: parseInt(unHashedId.id),
            },
            data: data_params,
        });

        if (response) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

/**
 * @api {post} /residence Update user adress infos
 *
 * @apiBody    {Int}       user_id         set user_id to user
 * @apiBody    {String}    adress          set Adress to user
 * @apiBody    {String}    city            set City to user
 * @apiBody    {String}    postal_code     set Postal Code to user
 * @apiBody    {String}    country         set Country to user
 */
crudUserRouter.post("/residence", async (req, res) => {
    if (jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)) {
        const unHashedId = jwt.verify(
            req.headers.authorization,
            process.env.PRIVATE_KEY
        );
        let body = req.body;
        let array_body = Object.entries(body);
        let data_params = {};

        array_body.forEach((element) => {
            const userDataTypes = [
                "user_id",
                "adress",
                "city",
                "postal_code",
                "country",
            ];
            if (userDataTypes.includes(element[0])) {
                data_params[element[0]] = element[1];
            }
        });

        data_params["user_id"] = parseInt(unHashedId.id);

        const response = await prisma.user_adress.create({
            data: data_params,
        });

        if (response) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});
/**
 * @api {post} /residence Update user adress infos
 *
 * @apiBody    {Int}       user_id         set user_id to user
 * @apiBody    {String}    payment_type    set Adress to user
 * @apiBody    {Date}      date_purchase   set City to user
 * @apiBody    {Float}     total_facture   set Postal Code to user
 * @apiBody    {Int}       bill_number     set Country to user
 * @apiBody    {String}    delivery        set Country to user
 */
crudUserRouter.post("/payment", async (req, res) => {
    const unHashedId = jwt.verify(req.body.user_id, process.env.PRIVATE_KEY);
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};

    array_body.forEach((element) => {
        const userDataTypes = [
            "user_id",
            "payment_type",
            "date_purchase",
            "total_facture",
            "bill_number",
            "delivery",
        ];
        if (userDataTypes.includes(element[0])) {
            if (element[0] == "date_purchase") {
                data_params[element[0]] = new Date(element[1]).toISOString();
            } else if (element[0] == "total_facture") {
                data_params[element[0]] = parseFloat(element[1]);
            } else if (element[0] == "bill_number") {
                data_params[element[0]] = parseInt(element[1]);
            } else {
                data_params[element[0]] = element[1];
            }
        }
    });

    data_params["user_id"] = parseInt(unHashedId.id);

    const response = await prisma.user_payment.create({
        data: data_params,
    });

    if (response) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

/**
 * @api {post} /residence Update user adress infos
 *
 * @apiBody    {Int}        user_id      set user_id to user
 * @apiBody    {Int}        product_id   set product_id to product
 * @apiBody    {Int}        nbr_stars    set Rate to product
 * @apiBody    {String}     comment      set Comment to product
 */
crudUserRouter.post("/review", async (req, res) => {
    const unHashedId = jwt.verify(req.body.user_id, process.env.PRIVATE_KEY);
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};

    array_body.forEach((element) => {
        const userDataTypes = ["user_id", "product_id", "nbr_stars", "comment"];
        if (userDataTypes.includes(element[0])) {
            if (element[0] != "comment") {
                data_params[element[0]] = parseInt(element[1]);
            } else {
                data_params[element[0]] = element[1];
            }
        }
    });

    data_params["user_id"] = parseInt(unHashedId.id);

    const response = await prisma.review_product.create({
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
crudUserRouter.put("/residence", async (req, res) => {
    const unHashedId = jwt.verify(req.body.id, process.env.PRIVATE_KEY);
    let body = req.body;
    let array_body = Object.entries(body);
    let data_params = {};

    array_body.forEach((element) => {
        const userDataTypes = ["adress", "city", "postal_code", "country"];
        if (userDataTypes.includes(element[0])) {
            data_params[element[0]] = element[1];
        }
    });

    const response = await prisma.user_adress.update({
        where: {
            id: parseInt(unHashedId.id),
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
 * @api {delete} / Delete user by id
 *
 * @apiBody {Int} id Id of User to delete
 */
crudUserRouter.delete("/", async (req, res) => {
    const unHashedId = jwt.verify(req.body.id, process.env.PRIVATE_KEY);
    await prisma.users.deleteMany({
        where: {
            id: parseInt(unHashedId.id),
        },
    });

    res.sendStatus(200);
});
/**
 * @api {delete} / Delete user_adress by id
 *
 * @apiBody {Int} id Id of User to delete
 */
crudUserRouter.delete("/residence", async (req, res) => {
    if (jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)) {
        await prisma.user_adress.delete({
            where: {
                id: parseInt(req.query.adress),
            },
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

module.exports = crudUserRouter;