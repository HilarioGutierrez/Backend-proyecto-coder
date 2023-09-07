import cartManager from "./cartManager";
import stripe from "stripe";

class buyManager {

    async buy (data) {
        const manager = new cartManager();

    const cart = manager.getOne(data)

    const stripePromise = loadStripe(proces.env.STRIPE_PUBLIC_KEY)
    }

}