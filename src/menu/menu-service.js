const MenuService = {
    getAllDishes(knex) {
      return knex.select('*').from('menu_list')
    },
    addNewDish(knex, newDish) {
      return knex
        .insert(newDish)
        .into('menu_list')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getDishById(knex, dishId) {
      return knex('menu_list')
        .select('*')
        .where('id', dishId)
        .first()
    },
    deleteDish(knex, dishId) {
      return knex('menu_list')
        .where('id', dishId)
        .delete()
    },
    updateDish(knex, dishId, newDishData) {
      return knex('menu_list')
        .where('id', dishId)
        .update(newDishData)
    }
  }
  
  module.exports = MenuService;