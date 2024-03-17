import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { OrderItem } from "../entity/OrderItem"

export class RevenueController {

    private customerRepository = AppDataSource.getRepository(OrderItem)

    async revenue_dates(request: Request, response: Response, next: NextFunction) {
        console.log("revenue_dates")

        const start_date = request.query.start_date as string
        const end_date = request.query.end_date as string
        return this.customerRepository.query(`
        SELECT
            EXTRACT(YEAR FROM o."purchaseDate") AS year,
            EXTRACT(MONTH FROM o."purchaseDate") AS month,
            SUM(oi.price * oi.quantity) AS revenue
        FROM
            order_item oi
        JOIN
            "order" o ON oi.order_id = o.id
        WHERE
            o."purchaseDate" BETWEEN '${start_date}' AND (CAST('${end_date}' AS DATE) - INTERVAL '1' DAY)
        GROUP BY
            year,
            month
        ORDER BY
            year,
            month;`)
    }

    async revenue_sum (request: Request, response: Response, next: NextFunction) {
        console.log("revenue_sum")
        return this.customerRepository.query(`
        SELECT SUM(price * quantity) AS total_revenue
        FROM order_item;`)
    }

}