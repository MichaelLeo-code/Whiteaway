import { Order } from "./Order";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"

@Entity()
export class Customer {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    registerDate: Date

    @PrimaryColumn()
    email: string

    @OneToMany(() => Order, order => order.customer)
    orders: Order[]
}