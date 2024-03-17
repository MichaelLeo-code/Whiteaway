import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"

export class OrderController {

    private customerRepository = AppDataSource.getRepository(Order)

    async quantity_dates(request: Request, response: Response, next: NextFunction) {
        console.log("quantity_dates_ORDER")

        const start_date = request.query.start_date as string
        const end_date = request.query.end_date as string
        return this.customerRepository.query(`
        SELECT
            EXTRACT(YEAR FROM "purchaseDate") AS year,
            EXTRACT(MONTH FROM "purchaseDate") AS month,
            COUNT(*) AS purchase_count
        FROM
            "order"
        WHERE
            "purchaseDate" BETWEEN '${start_date}' AND '${end_date}'
        GROUP BY
            EXTRACT(YEAR FROM "purchaseDate"),
            EXTRACT(MONTH FROM "purchaseDate")
        ORDER BY
            EXTRACT(YEAR FROM "purchaseDate"),
            EXTRACT(MONTH FROM "purchaseDate");`)
    }

    async quantity_sum (request: Request, response: Response, next: NextFunction) {
        console.log("quantity_sum_ORDER")
        return this.customerRepository.query(`
            SELECT COUNT(*) AS total_orders
            FROM "order";`)
    }

}