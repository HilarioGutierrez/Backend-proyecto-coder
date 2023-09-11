class User {

    constructor(props) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.age = props.age;
        this.password = props.password;
        this.cart = props.cart;
        this.permissions = props.permissions;
        this.isAdmin = props.isAdmin;
        this.loginDate = props.loginDate;
    }
}

export default User;