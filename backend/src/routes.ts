import { Request, Response, Router, query } from 'express'
import { CustomerController } from './controller/CustomerController'
import { OrderController } from './controller/OrderController'
import { RevenueController } from './controller/RevenueController'

import * as express from "express"

export const routes = express.Router()

const customerController = new CustomerController
const orderController = new OrderController
const revenueController = new RevenueController

//if query parameters are present, then send the specified dates.
// Unfortunately, Express.js doesn't provide this functionality by default, so i had to check manually
routes.get('/customers/quantity', async (req, res) => {
    if(Object.keys(req.query).length === 2){
        res.send(await customerController.quantity_dates(req))
    }else{
        res.send(await customerController.quantity_sum(req))
    }
})

routes.get('/orders/quantity', async (req, res) => {
    if(Object.keys(req.query).length === 2){
        res.send(await orderController.quantity_dates(req))
    }else{
        res.send(await orderController.quantity_sum(req))
    }
})

routes.get('/revenue', async (req, res) => {
    if(Object.keys(req.query).length === 2){
        res.send(await revenueController.revenue_dates(req))
    }else{
        res.send(await revenueController.revenue_sum(req))
    }
})


// export const Routes = [

// //ORDERS
// {
//     method: "get",
//     route: "/orders/quantity",
//     controller: OrderController,
//     action: "quantity_dates",
//     queryParams: ["start_date", "end_date"]
// },
// {
//     method: "get",
//     route: "/orders/quantity/sum",
//     controller: OrderController,
//     action: "quantity_sum",
// },
// //REVENUE
// {
//     method: "get",
//     route: "/revenue",
//     controller: RevenueController,
//     action: "revenue_dates",
//     queryParams: ["start_date", "end_date"]
// },
// {
//     method: "get",
//     route: "/revenue/sum",
//     controller: RevenueController,
//     action: "revenue_sum",
// }
// ]