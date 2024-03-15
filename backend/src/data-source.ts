import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Customer } from "./entity/Customer"
import { Order } from "./entity/Order"
import { OrderItem } from "./entity/OrderItem"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ek52!Otr:3",
    database: "Whiteaway",
    synchronize: true,
    logging: false,
    entities: [Customer, Order, OrderItem],
    migrations: [],
    subscribers: [],
})
