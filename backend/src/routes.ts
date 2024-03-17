import { UserController } from "./controller/UserController"
import { CustomerController } from "./controller/CustomerController"
import { OrderController } from "./controller/OrderController"
import { RevenueController } from "./controller/RevenueController"

export const Routes = [
{
    method: "get",
    route: "/customers/quantity",
    controller: CustomerController,
    action: "quantity_dates",
    queryParams: ["start_date", "end_date"]
},
{
    method: "get",
    route: "/customers/quantity/sum",
    controller: CustomerController,
    action: "quantity_sum",
},
{
    method: "get",
    route: "/customers",
    controller: CustomerController,
    action: "dates",
    queryParams: ["start_date", "end_date"]
}, {
    method: "get",
    route: "/customers",
    controller: CustomerController,
    action: "all"
}, {
    method: "get",
    route: "/customers/:id",
    controller: CustomerController,
    action: "one"
}, 
//ORDERS
{
    method: "get",
    route: "/orders/quantity",
    controller: OrderController,
    action: "quantity_dates",
    queryParams: ["start_date", "end_date"]
},
{
    method: "get",
    route: "/orders/quantity/sum",
    controller: OrderController,
    action: "quantity_sum",
},
//REVENUE
{
    method: "get",
    route: "/revenue",
    controller: RevenueController,
    action: "revenue_dates",
    queryParams: ["start_date", "end_date"]
},
{
    method: "get",
    route: "/revenue/sum",
    controller: RevenueController,
    action: "revenue_sum",
}
]