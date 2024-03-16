import { UserController } from "./controller/UserController"
import { CustomerController } from "./controller/CustomerController"

export const Routes = [
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
}
// , {
//     method: "post",
//     route: "/users",
//     controller: UserController,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/users/:id",
//     controller: UserController,
//     action: "remove"
// }
]