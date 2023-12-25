import React, { useState, useEffect} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import NotFound from "../Layout/NotFound";
import Card from "../Card/Card"
import { readDeck } from "../utils/api";

export const DeckView = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const [cards, setCards] = useState([])

//set deck and cards on load
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then((response) =>
          {setDeck(response);
            //cards are a list of "Card" jsx
            setCards(response.cards.map((card) => <Card key={card.id} card ={card} cardId={card.id}  />));
          })
          .catch(setError);    
    return () => abortController.abort();
  }, []);  


  const history = useHistory();
 
  const handleDelete = async () => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deckId);
    }
    history.go(0);
  };

  if (deck)  {
    return (
      <div className="container">        
     <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
      </ol>
    </nav>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p> 

              <Link to={`/decks/${deck.id}/edit`} className="btn btn-primary">Edit</Link>
              <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>

        <Link to={`/decks/${deck.id}/study`} className="btn btn-warning">Study</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
    <main className="container">
    <section className="row">{cards}</section>
  </main>
  </div>
    );
  }
  
return <NotFound/>;

};



export default DeckView;
