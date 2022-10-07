const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')

const prisma = new PrismaClient()
const crudSaleAdminRouter = express.Router()
crudSaleAdminRouter.use(express.json());
crudSaleAdminRouter.use(express.urlencoded({ extended: true }));
crudSaleAdminRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {post} / Create a sale by Admin
 * 
 * @apiBody {String}    name        Name of Sale
 * @apiBody {String}    value       Value of Sale
 * @apiBody {String}    time        Time of validity Sale
 * @apiBody {String}    limit       Limit of validity Sale
 * @apiBody {String}    options     Options of Sale
 */
crudSaleAdminRouter.post("/", async (req, res) => {
    await prisma.sale.create({
        data: {
            name: req.body.name,
            sale_value: req.body.value,
            valid_time: req.body.time,
            sale_limit: req.body.limit,
            options: req.body.options
        }
    })
    res.sendStatus(200)
})

/**
 * @api {get} / Print all Sale for Admin
 * 
 * @apiSuccess {Int}        id
 * @apiSuccess {String}     name        Return Name of Sale
 * @apiSuccess {Int}        sale_value  Return Value of Sale
 * @apiSuccess {String}     valid_time  Return Time of Sale
 * @apiSuccess {String}     sale_limit  Return Limit of Sale
 * @apiSuccess {String}     options     Return Options of Sale
 * @apiSuccess {Int}        id          Id of Product in Sale
 * @apiSuccess {String}     name        Name of Product in Sale
 * @apiSuccess {Int}        price       Base of Product price
 */
crudSaleAdminRouter.get("/", async (req, res) => {
    const sales = await prisma.sale.findMany({
        select: {
            id: true,
            name: true,
            sale_value: true,
            valid_time: true,
            sale_limit: true,
            options: true,
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true
                }
            }
        }
    })
    res.json(sales)
})

/**
 * @api {put} /limit Update time sale by Admin
 * 
 * @apiBody {Int}       id          Id of Sale
 * @apiBody {String}    name        Name of Sale
 * @apiBody {Int}       value       Value of Sale in %
 * @apiBody {String}    time        Time to validity of Sale
 * @apiBody {String}    limit       Limit to validity of Sale
 * @apiBody {String}    options     Options of Sale
 */
crudSaleAdminRouter.put("/", async (req, res) => {
    let body = req.body
    let array_body = Object.entries(body)
    let data_params = {}
    let array_params = [
        "name",
        "value",
        "time",
        "limit",
        "option"
    ]

    array_body.forEach(element => {
        if (array_params.includes(element[0])) {
            data_params[element[0]] = element[1]
        }
    })

    await prisma.sale.update({
        where: {
            id: parseInt(req.body.id)
        },
        data: data_params
    })
    res.sendStatus(200)
})

/**
 * @api {put} / Delete sale by Admin
 * 
 * @apiBody {Int}   id    Id of Sale to delete
 */
crudSaleAdminRouter.delete("/", async (req, res) => {
    await prisma.sale.deleteMany({
        where: {
            id: parseInt(req.body.id)
        }
    })
    res.sendStatus(200)
})

module.exports = crudSaleAdminRouter
