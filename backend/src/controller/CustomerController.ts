import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Customer } from "../entity/Customer"

export class CustomerController {

    private customerRepository = AppDataSource.getRepository(Customer)

    async all(request: Request, response: Response, next: NextFunction) {
        console.log("all")
        return this.customerRepository.find()
    }

    async one(request: Request, response: Response) {
        const email = request.params.email

        const customer = await this.customerRepository.findOne({
            where: { email }
        })

        if (!customer) {
            return "not existent customer"
        }
        return customer
    }

    async dates(request: Request, response: Response, next: NextFunction) {
        const start_date = request.query.start_date as string
        const end_date = request.query.end_date as string
        return this.customerRepository.query(`SELECT * FROM customer WHERE "registerDate" BETWEEN '${start_date}' AND '${end_date}'`)
    }

}