const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')

const prisma = new PrismaClient()
const crudBillRouter = express.Router()
crudBillRouter.use(express.json());
crudBillRouter.use(express.urlencoded({ extended: true }));
crudBillRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {post} / Create Bill
 * 
 * @apiBody {Int}       id                  User id to create the Bill
 * @apiBody {String}    payment_type        Type of payment to the Order
 * @apiBody {Date}      date_purchase       Date of Purchase Order
 * @apiBody {Float}     total_facture       Total of Bill
 * @apiBody {Int}       bill_number         Identification Number of Bill
 * @apiBody {String}    delivery            Delivery Method of Order
 */
crudBillRouter.post("/", async (req, res) => {
    await prisma.user_payment.create({
        data: {
            users: {
                connect: {
                    id: parseInt(req.body.id)
                }
            },
            payment_type: req.body.payment_type,
            date_purchase: req.body.date_purchase,
            total_facture: req.body.total_facture,
            bill_number: req.body.bill_number,
            delivery: req.body.delivery
        }
    })
    res.sendStatus(200)
})

/**
 * @api {get} / Print Bill of User
 * 
 * @apiBody    {Int}        user_id             Id of User for print is Bill
 * 
 * @apiSuccess {Int}        id                  Return the Id of Order in User Payment
 * @apiSuccess {String}     first_name          Return the first name of User in User Payment
 * @apiSuccess {String}     last_name           Return the last name of User in User Payment
 * @apiSuccess {String}     payment_type        Return the Payment Type of User Order
 * @apiSuccess {Date}       date_purchase       Return the Date Purchase of Order
 * @apiSuccess {Float}      total_facture       Return the Total of Order
 * @apiSuccess {Int}        bill_number         Return the Number of Order
 * @apiSuccess {String}     delivery            Return the Delivery method of Order
 */
crudBillRouter.get("/", async (req, res) => {
    const bills = await prisma.user_payment.findMany({
        where: {
            users: {
                select: {
                    id: req.body.user_id
                }
            }
        },
        select: {
            id: true,
            users: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
            payement_type: true,
            date_purchase: true,
            total_facture: true,
            bill_number: true,
            delivery: true
        }
    })
    res.json(bills)
})

/**
 * @api {put} / Update Order by User
 * 
 * @apiBody {Int}       id               Id of Order for update
 * @apiBody {String}    payment_type     Type of payment to the Order
 * @apiBody {Date}      date_purchase    Date of purchase to the Order
 * @apiBody {Float}     total_facture    Total of Order
 * @apiBody {Int}       bill_number      Number of Order
 * @apiBody {String}    delivery         Type of Delivery to the Order
 */
crudBillRouter.put("/", async (req, res) => {
    let body = req.body
    let array_body = Object.entries(body)
    let data_params = {}
    let array_params = [
        "payement_type",
        "date_purchase",
        "total_facture",
        "bill_number",
        "delivery"
    ]

    array_body.forEach(element => {
        if (array_params.includes(element[0])) {
            data_params[element[0]] = element[1]
        }
    })

    await prisma.user_payment.update({
        where: {
            id: parseInt(req.body.cart_id)
        },
        data: data_params
    })
    res.sendStatus(200)
})

/**
 * @api {delete} / Delete Order
 * 
 * @apiBody {Int}   id    Id of the Order to Delete
 */
crudBillRouter.delete("/", async (req, res) => {
    await prisma.user_payment.delete({
        where: {
            id: parseInt(req.body.id)
        }
    })
    res.sendStatus(200)
})

module.exports = crudBillRouter
