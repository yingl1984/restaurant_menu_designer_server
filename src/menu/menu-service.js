const MenuService = {
  // Get all dishes
  getAllDishes(knex) {
    return knex.select('*').from('menu_list')
  },
  // Add a new dish
  addNewDish(knex, newDish) {
    return knex
      .insert(newDish)
      .into('menu_list')
      .returning('*')
      .then(rows => {
          return rows[0]
      })
  },
  // Get a specific dish
  getDishById(knex, dishId) {
    return knex('menu_list')
      .select('*')
      .where('id', dishId)
      .first()
  },
  // Delete a specific dish
  deleteDish(knex, dishId) {
    return knex('menu_list')
      .where('id', dishId)
      .delete()
  },
  // Update a specific dish
  updateDish(knex, dishId, newDishData) {
    return knex('menu_list')
      .where('id', dishId)
      .update(newDishData)
  }
}
  
  module.exports = MenuService;