const express = require('express');
const path = require('path');
const xss = require('xss');
const MenuService = require('./menu-service');

const menuRouter = express.Router();
const jsonParser = express.json();

const dishFormat = dish => ({
  id:xss(dish.id),
  name: xss(dish.name),
  price: xss(dish.price),
  rate: xss(dish.rate),
  comments:xss(dish.comments),
});

menuRouter.route('/')
  .get((req, res, next) => {
    MenuService.getAllDishes( req.app.get('db') )
    .then(menu => { res.json(menu.map(dishFormat)) })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, price, rate, comments } = req.body;
    const newDishInfo = { name,price};

    for (const [key, value] of Object.entries(newDishInfo)) {
        if (value == null) {
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
            })
        }
    }
    newDishInfo.rate = rate
    newDishInfo.comments = comments

    MenuService.addNewDish( req.app.get('db'), newDishInfo)
      .then(dish => {
        res.status(201)
        .location(path.posix.join(req.originalUrl +`/${dish.id}`))
        .json(dishFormat(dish))
      })
      .catch(next)
  })

  menuRouter.route('/:dish_id')
    .all((req, res, next) => {
      MenuService.getDishById( req.app.get('db'), req.params.dish_id )
        .then(dish => {
          if(!dish) { return res.status(404).json({error: {message: 'Dish does not exist'} }) }
          res.dish = dish;
          next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
      return res.json(dishFormat(res.dish))
    })
    .delete((req, res, next) => {
      MenuService.deleteDish( req.app.get('db'), req.params.dish_id )
      .then(() => { res.status(204).end() })
      .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
      const { name, price, rate, comments } = req.body
      const dishToUpdate = { name, price, rate, comments }
  
      const numberOfValues = Object.values(dishToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).send("Nothing is updated");
        MenuService.updateDish(
        req.app.get('db'),
        req.params.dish_id,
        dishToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
  

module.exports = menuRouter;