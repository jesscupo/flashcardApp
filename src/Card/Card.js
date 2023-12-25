import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api";
import NotFound from "../Layout/NotFound";

export const Card = ({ card, cardId}) => {

  const history = useHistory();
  const { url } = useRouteMatch();

  const handleDelete = async () => {
    const result = window.confirm("Are you sure you want to delete this card?");
    if (result) {
      await deleteCard(cardId);
    }
    history.go(0);
  };

  if (card) {
    return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">{card.front}</p>
        <p className="card-text">{card.back}</p>
        <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-warning">Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
    );
  }
  
return <NotFound/>;

};



export default Card;
