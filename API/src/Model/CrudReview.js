const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const prisma = new PrismaClient()
const crudReviewRouter = express.Router()
crudReviewRouter.use(express.json());
crudReviewRouter.use(express.urlencoded({ extended: true }));
crudReviewRouter.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

/**
 * @api {post} / Create review by user
 * 
 * @apiBody {Int}       id            User id to create the review
 * @apiBody {Int}       product_id    Id of product in review
 * @apiBody {Int}       nbr_stars     Number of stars of the  review
 * @apiBody {String}    comment       Comment of Review
 */
crudReviewRouter.post("/", async (req, res) => {
    let hashedId = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)
    const idUser = jwt.verify(hashedId.userInfo.id, process.env.PRIVATE_KEY).id;
    await prisma.review_product.create({
        data: {
            user_id: parseInt(idUser),
            product_id: parseInt(req.body.product_id),
            nbr_stars: parseInt(req.body.nbr_stars),
            comment: req.body.comment
        }
    })
    res.sendStatus(200)
})

/**
 * @api {get} / Print all review for user
 * 
 * @apiBody    {Int}    product_id          Id of product for print all review
 * 
 * @apiSuccess {Int}    id          Return the id of the user who created the review
 * @apiSuccess {String} first_name  Return the first name of the user who created the review  
 * @apiSuccess {String} name        Return the name of product to the review
 * @apiSuccess {Int}    nbr_stars   Return the number of stars
 * @apiSuccess {String} comment     Return the comment of the review
 */
crudReviewRouter.get("/", async (req, res) => {
    const review = await prisma.review_product.findMany({
        where: {
            product: {
                id: req.body.product_id
            }
        },
        select: {
            id: true,
            users: {
                select: {
                    first_name: true
                }
            },
            product: {
                select: {
                    name: true
                }
            },
            nbr_stars: true,
            comment: true
        }
    })
    res.json(review)
})

/**
 * @api {put} / Update review by user
 * 
 * @apiBody {Int}       review_id   Id of the review for update
 * @apiBody {String}    comment     Comment of the review
 * @apiBody {Int}       nbr_stars   Number of stars to the review
 */
crudReviewRouter.put("/", async (req, res) => {
    let body = req.body
    let array_body = Object.entries(body)
    let data_params = {}
    let array_params = [
        "comment",
        "nbr_stars",
    ]

    array_body.forEach(element => {
        if (array_params.includes(element[0])) {
            data_params[element[0]] = element[1]
        }
    })

    await prisma.review_product.update({
        where: {
            id: parseInt(req.body.review_id)
        },
        data: data_params
    })
    res.sendStatus(200)
})

/**
 * @api {delete} / Delete review by user
 * 
 * @apiBody {Int}   id    Id of the review to delete
 */
crudReviewRouter.delete("/", async (req, res) => {
    await prisma.review_product.deleteMany({
        where: {
            id: parseInt(req.body.id)
        }
    })
    res.sendStatus(200)
})

module.exports = crudReviewRouter
