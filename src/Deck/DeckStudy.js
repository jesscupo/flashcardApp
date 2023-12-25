import React,  { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";
import { readDeck } from "../utils/api";


function DeckStudy() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(undefined);
  
//load the deck upon page load
    useEffect(() => {
      const abortController = new AbortController();
      readDeck(deckId, abortController.signal).then((deck)=>
      {
        setDeck(deck);
        setCards(deck.cards);
      })
      .catch(setError)
  
      return () => abortController.abort();
    }, []);  


//nav bar + deck title for study screen
  return (
    <div className="container">

<nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Study</li>
  </ol>
</nav>

    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Study: {deck.name}</h2>
      </div>
    </div>

    </div>   
  );
}

export default DeckStudy;
