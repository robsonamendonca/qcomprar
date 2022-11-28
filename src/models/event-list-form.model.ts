import { ListPurchase } from "./listpurchase.model";

export class EventListForm {
    constructor(
        public item: ListPurchase,
        public event: Event
    ){ }
}