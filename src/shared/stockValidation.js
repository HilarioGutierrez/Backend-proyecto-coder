export const stockValidation = (stock, cart) => {



    cart.map( cart => cart.id );
    stock.map( product => product.id );

    const cartProductsQuantities = cartProducts.map( cart => cart.products.quantity );
    const stockProductsQuantities = stockProducts.map( product => product.stock );

    const cartProductsQuantitiesObject = {};
    const stockProductsQuantitiesObject = {};

    cartProductsIds.forEach( (id, i) => cartProductsQuantitiesObject[id] = cartProductsQuantities[i] );
    stockProductsIds.forEach( (id, i) => stockProductsQuantitiesObject[id] = stockProductsQuantities[i] );

    const validation = cartProductsIds.every( id => stockProductsIds.includes(id) && cartProductsQuantitiesObject[id] <= stockProductsQuantitiesObject[id] );

    return validation;
}