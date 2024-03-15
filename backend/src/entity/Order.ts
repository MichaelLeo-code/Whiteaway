import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { OrderItem } from "./OrderItem"
import { Customer } from "./Customer"

@Entity()
export class Order {
    @Column()
    purchaseDate: Date

    @Column()
    country: string

    @Column()
    device: string

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    ordersItems: OrderItem[]

    @ManyToOne(() => Customer, customer => customer.orders)
    @JoinColumn({ name: 'customer_email' })
    customer: Customer
}