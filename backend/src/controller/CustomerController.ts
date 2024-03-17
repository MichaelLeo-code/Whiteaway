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
        console.log("one")

        const email = request.params.email

        const customer = await this.customerRepository.findOne({
            where: { email }
        })

        if (!customer) {
            return "not existent customer"
        }
        return customer
    }

    async dates(request: Request) {
        console.log("dates")

        const start_date = request.query.start_date as string
        const end_date = request.query.end_date as string
        return this.customerRepository.query(`SELECT * FROM customer WHERE "registerDate" BETWEEN '${start_date}' AND '${end_date}';`)
    }

    async quantity_dates(request: Request) {
        console.log("quantity_dates")

        const start_date = request.query.start_date as string
        const end_date = request.query.end_date as string
        return this.customerRepository.query(`
        SELECT
            EXTRACT(YEAR FROM "registerDate") AS registration_year,
            EXTRACT(MONTH FROM "registerDate") AS registration_month,
            COUNT(*) AS customer_count
        FROM
            customer
        WHERE
            "registerDate" BETWEEN '${start_date}' AND '${end_date}'
        GROUP BY
            EXTRACT(YEAR FROM "registerDate"),
            EXTRACT(MONTH FROM "registerDate")
        ORDER BY
            EXTRACT(YEAR FROM "registerDate"),
            EXTRACT(MONTH FROM "registerDate");`)
    }

    async quantity_sum (request: Request) {
        console.log("quantity_sum")
        return this.customerRepository.query(`
            SELECT COUNT(*) AS total_customers
            FROM customer;`)
    }

    async top () {
        console.log("top")
        return this.customerRepository.query(`
        SELECT
            c."firstName",
            c."lastName",
            COUNT(o.id) AS num_orders,
            SUM(oi.quantity * oi.price) AS total_value
        FROM
            "customer" c
        JOIN
            "order" o ON c.email = o.customer_email
        JOIN
            "order_item" oi ON o.id = oi.order_id
        GROUP BY
            c.email
        ORDER BY
            total_value DESC
        LIMIT 5;`)
    }

}