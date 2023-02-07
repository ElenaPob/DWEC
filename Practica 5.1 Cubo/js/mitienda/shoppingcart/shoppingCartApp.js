import ShoppingCart from './shoppingCartModel.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './shoppingCartModel.js';
import {Product, Laptop, Camera, Smartphone, Tablet} from './shoppingCartModel.js';
import {ShoppingCartException, ProductShoppingCartException, ProductNotExistException, PositionOutBoundsException} from './shoppingCartModel.js';
import ShoppingCartController from './shoppingCartController.js';
import ShoppingCartView from './shoppingCartView.js';

$(function(){
  const ShoppingCartApp = new ShoppingCartController(
    ShoppingCart.getInstance(), new ShoppingCartView()
  );
});

