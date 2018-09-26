# Andela Developer Challenge

[![Challenge](https://img.shields.io/badge/Andela%20Challenge-Fast--Food--Fast-green.svg)](https://github.com/eltNEG/Fast-Food-Fast)

[![Build Status](https://travis-ci.org/eltNEG/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/eltNEG/Fast-Food-Fast)

[![Coverage Status](https://coveralls.io/repos/github/eltNEG/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/eltNEG/Fast-Food-Fast?branch=develop)

## BUILD A PRODUCT: Fast-Food-Fast

### Project Overview
Fast-Food-Fast is a food delivery service app for a restaurant. The project is built with html and css with no external library. The ui template of the restaurant can be found [here](https://eltneg.github.io/Fast-Food-Fast/UI/index.html) and the api [here](http://fastfoodfast-restaurant.herokuapp.com/api/v1/ping). However, the develop is the most up-to-date with new features.

### Features (UI)
- [User can create an account](https://eltneg.github.io/Fast-Food-Fast/UI/sign-up.html)
- [User can login to their account](https://eltneg.github.io/Fast-Food-Fast/UI/index.html)
- [User can order for food](https://eltneg.github.io/Fast-Food-Fast/UI/order-food.html)
- [User can see a history of ordered food](https://eltneg.github.io/Fast-Food-Fast/UI/order-history.html)
- [Admin can manage order](https://eltneg.github.io/Fast-Food-Fast/UI/manage-order.html)
- [Admin can manage food menu](https://eltneg.github.io/Fast-Food-Fast/UI/manage-food-items.html)

### Features (API)

Base URL: http://fastfoodfast-restaurant.herokuapp.com

| Endpoint | Type | Description | payload |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| /api/v1/order | GET | get all orders |-|
| /api/v1/orders/:orderId | GET | fetch a specific order |-|
| /api/v1 /orders | POST | place a new order |customerName (string), customerAddress (string),  foodOrdered (string)|
| /api/v1/orders/:orderId | PUT | Updates order state and status |completed (bool), orderStatus (accepted or rejected)|


- GET /orders: get all orders
- GET /orders/<orderId>: fetch a specific order
- POST /orders: place a new order
- PUT /orders/<ordersId>: update order status

### How to set up the this project
- Clone this repository
- Change directory into the created folder
- Run `yarn install`
- Run `yarn test` to test the application
- Run `yarn devstart` to start developemnt locally


### Contribution
- Clone the develop branch of this repository
- Create a feature branch and make changes
- Create a pull request to the develop branch

### Todo
- Add nodejs backend