import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = props => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
      fetch('https://react-hooks-85f67.firebaseio.com/ingredients.json')
          .then(response => response.json())
          .then(responseData => {
              const loadedIngredients = [];
              for(let key in responseData) {
                  loadedIngredients.push({
                      id: key,
                      title: responseData[key].title,
                      amount: responseData[key].amount
                  });
              }
              setUserIngredients(loadedIngredients);
          });
  }, []);

  const filteredIngredientsHandler = useCallback(filtered => {
      setUserIngredients(filtered);
  }, []);

  const addIngredientHandler = ingredient => {
      fetch('https://react-hooks-85f67.firebaseio.com/ingredients.json', {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: {'Content-Type': 'application/json'}
      }).then(response => {
          return response.json();
      }).then(resData => {
          setUserIngredients(prevIngredient => [...prevIngredient, {id: resData.name, ...ingredient}]);
      })
  }


  const removeIngredientHandler = ingredientId => {
      setUserIngredients(prevIngredients =>
          prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
            ingredients={userIngredients}
            onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
