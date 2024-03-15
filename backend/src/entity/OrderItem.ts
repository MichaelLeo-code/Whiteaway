import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
import { Order } from "./Order"

@Entity()
export class OrderItem {
    @PrimaryColumn()
    EAN: string

    @Column()
    quantity: number

    @Column()
    price: number

    @ManyToOne(() => Order, order => order.ordersItems)
    @JoinColumn({ name: 'order_id' })
    order: Order
}