import React, {useState} from 'react';

import Card from '../UI/Card';
import LoadingIndicator from "../UI/LoadingIndicator";
import Button from "@material-ui/core/Button";
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: title, amount: amount});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={event => {
                  const newTitle = event.target.value;
                  setTitle(newTitle);
                }}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={event => {
                    const newAmount = event.target.value;
                    setAmount(newAmount);
                }} />
          </div>
          <div className="ingredient-form__actions">
            <Button type="submit" variant="contained" color="secondary">Add Ingredient</Button>
              {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
