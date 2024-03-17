import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Order } from "./Order"

@Entity()
export class OrderItem {
    @Column()
    EAN: string

    @Column()
    quantity: number

    @Column({ type: "float" })
    price: number

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Order, order => order.ordersItems)
    @JoinColumn({ name: 'order_id' })
    order: Order
}