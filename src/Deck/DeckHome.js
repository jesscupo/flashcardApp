import React, { useState, useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { deleteDeck } from "../utils/api";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";


export const DeckHome = ({deck, deckId}) => {

  const history = useHistory();
  const [error, setError] = useState(undefined);
  const [cardCount, setCardCount] = useState([]);

  const handleDelete = async () => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deckId);
    }
    history.go(0);
  };

  useEffect(() => {
    const abortController = new AbortController();
    setCardCount(deck.cards.length);
    return () => abortController.abort();
  }, []);  


  if (deck)  {
    return (
          
          <div className="container">        
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{cardCount} cards</h6>
                <p className="card-text">{deck.description}</p> 
                <Link to={`/decks/${deck.id}`} className="btn btn-primary">View</Link> 
                <Link to={`/decks/${deck.id}/study`} className="btn btn-warning">Study</Link>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
  
    );
  }
  
return <NotFound/>;

};



export default DeckHome;
