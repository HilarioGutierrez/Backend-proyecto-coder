class User {

    constructor(props) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.age = props.age;
        this.password = props.password;
        this.cart = props.cart;
        this.roles = props.roles;
        this.isAdmin = props.isAdmin;
    }
}

export default User;