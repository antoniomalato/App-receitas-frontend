import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from '../ShareButton/ShareButton';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { COPIED } from '../../constants';
import './FavoriteRecipeCard.css';
import Message from '../Message/Message';

function FavoriteRecipeCard({ recipe, index, removeFavorite }) {
  const [mealOrDrink, setMealOrDrink] = useState(false);
  const [clipboard, setClipboard] = useState(false);

  useEffect(() => {
    if (recipe.alcoholicOrNot === '') {
      setMealOrDrink(true);
    }
  }, [recipe.alcoholicOrNot]);

  return (
    <div>
      <Link to={ mealOrDrink ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt="recipe"
          data-testid={ `${index}-horizontal-image` }
          className="recipe-card-img"
        />
      </Link>
      <div>
        { mealOrDrink ? (
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.area} - ${recipe.category}` }
          </p>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
        ) }
        <Link to={ mealOrDrink ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
        <ShareButton
          ext={ `/${recipe.type}s/${recipe.id}` }
          setCopied={ setClipboard }
          id={ `${index}-horizontal-share-btn` }
        />
        { clipboard && <Message msg={ COPIED } /> }
        <button
          type="button"
          onClick={ () => removeFavorite(recipe.id) }
        >
          <img
            src={ blackHeartIcon }
            alt="favorite icon"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    </div>
  );
}

export default FavoriteRecipeCard;

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};
