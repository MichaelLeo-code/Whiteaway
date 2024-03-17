import { Request, Response, Router, query } from 'express'
import { CustomerController } from '../controller/CustomerController'


export const customerRoutes = Router();

const customerController = new CustomerController

//if query parameters are present, then send the specified dates.
// Unfortunately, Express.js doesn't provide this functionality by default, so i had to check manually
customerRoutes.get('/customers/quantity', async (req, res) => {
    if(Object.keys(req.query).length === 2){
        res.send(await customerController.quantity_dates(req))
    }else{
        res.send(await customerController.quantity_sum(req))
    }
})