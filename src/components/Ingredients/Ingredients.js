import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';

const Ingredients = props => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      setIsLoading(true);
      fetch('https://react-hooks-85f67.firebaseio.com/ingredients.json', {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: {'Content-Type': 'application/json'}
      }).then(response => {
          setIsLoading(false);
          return response.json();
      }).then(resData => {
          setUserIngredients(prevIngredient => [...prevIngredient, {id: resData.name, ...ingredient}]);
      })
  }

  const removeIngredientHandler = ingredientId => {
      setIsLoading(true);
      fetch(`https://react-hooks-85f67.firebaseio.com/ingredients/${ingredientId}.jon`, {
          method: 'DELETE',
      }).then(response => {
          setIsLoading(false);
          setUserIngredients(prevIngredients =>
              prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
          );
      }).catch(err => {
          setError(err.message);
          setIsLoading(false);
      });
  };

  const clearErrorModal = () => {
      setError(null);
  }

  return (
    <div className="App">
        {error && <ErrorModal onClose={clearErrorModal}>{error}</ErrorModal>}

      <IngredientForm
          onAddIngredient={addIngredientHandler}
          loading={isLoading}
      />

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
