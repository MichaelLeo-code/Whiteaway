import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Customer } from "../entity/Customer"

export class CustomerController {

    private customerRepository = AppDataSource.getRepository(Customer)

    async all(request: Request, response: Response, next: NextFunction) {
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

}