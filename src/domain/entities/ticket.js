class Ticket {
    constructor(props) {
        this.id = props._id;
        this.code = props.code;
        this.purchaseDatetime = props.purchaseDatetime;
        this.product = props.product;
        this.amount = props.amount;
        this.purchaser = props.purchaser;
    }

}

export default Ticket;