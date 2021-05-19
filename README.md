# Restaurant Menu Designer

Restaurant Menu Design is a tool to design a menu for a restaurant.
In the menu list page, user will have a clear view of all their dishes in the menu now. They can Add or Delete a dish conveniently.After clicking each dish's link, user will drill down to the detail page to review the dish's detail information. They also can update the detail information of that dish.

Check it out: [Restaurant Menu Designer](https://menu-designer-projecta.vercel.app/).

## Project Setup:
-   Run `git clone` to clone the project from https://github.com/yingl1984/restaurant_menu_designer_server
-   Then run `npm install`

## API Documentation
-   Heroku server
    > https://stark-stream-92628.herokuapp.com/
-   Get menu list
    > https://stark-stream-92628.herokuapp.com/api/menu/api/menu
    ![Screen shot for GET ALL endpoint](/src/images/postmanGET_ALL.png)

-   Post a dish
    > https://stark-stream-92628.herokuapp.com/api/menu/api/menu
    ![Screen shot](/src/images/postmanPOST.png)
    
-   Get/Delete/Update specific dish through id
    > https://stark-stream-92628.herokuapp.com/api/menu/api/dish/5
    ![Screen shot for GET specific dish endpoint](/src/images/postmanGET.png)
    ![Screen shot for DELETE endpoint](/src/images/postmanDELETE.png)
    ![Screen shot for PATCH endpoint](/src/images/postmanPATCH.png)


## The technology I used in this project
```python

*   Back-end

    > Node.js, Express, Knex.js,  

*   Others

    > Mocha + Chai + Supertest + Enzyme, RESTful API, Heroku

```
