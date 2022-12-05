export enum MESSAGES {
  CREATE_PRODUCT_SUCCESS = 'create product is successfully',
  UPDATE_PRODUCT_SUCCESS = 'update product is successfully',
  DELETE_PRODUCT_SUCCESS = 'delete product is successfully',

  LOAD_PRODUCT_SUCCESS = 'load product is successfully',

  CREATE_PRODUCT_ERROR = 'cant create product ' + 'ERROR-MESSAGE:',
  UPDATE_PRODUCT_ERROR = 'cant update product ' + 'ERROR-MESSAGE:',
  DELETE_PRODUCT_ERROR = 'cant delete product ' + 'ERROR-MESSAGE:',

  UPDATE_QUANTITY = 'update quantity is successfully',
  UPDATE_QUANTITY_ERROR = 'cant update quantity ' + 'ERROR-MESSAGE:',

  DELETE_PRODUCT_FROM_CART = 'remove product from cart is successfully',
  DELETE_PRODUCT_FROM_CART_ERROR = 'cant delete product from cart  ' + 'ERROR-MESSAGE:',

  ADD_PRODUCT_TO_SHOPPING_CART = 'add product to cart is successfully ',
  ADD_PRODUCT_TO_SHOPPING_CART_ERROR = 'cant add product to cart ' + 'ERROR-MESSAGE:',

  CANT_LOAD_PRODUCTS = 'Sorry, there was a problem loading the products,' +
    'please contact the support and give the error message and click ok. ' + 'ERROR-MESSAGE:',

  CANT_LOAD_SHOPPING_CART = 'Sorry, there was a problem loading the your shopping carts, ' +
    'please contact the support and give the error message and click ok. ' + 'ERROR-MESSAGE:'
}
