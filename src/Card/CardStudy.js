import React, {useState, useEffect} from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

export const CardStudy = () => {
  const { deckId } = useParams();
  const history = useHistory();

  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState([])
  const [error, setError] = useState(undefined);
  const [card, setCard] = useState([]);
  const [cardSide, setCardSide] = useState([]);
  const [cardCounter, setCardCounter] = useState([]);


  useEffect(() => {
      
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
        .then((deck)=>
        //set all variables to be used for card flipping/next functionality
        { setCards(deck.cards);
          setCardCount(deck.cards.length);
          setCard(deck.cards[0]);
          setCardSide("1");
          setCardCounter(0);
        }
        ) 
        .catch(setError)
    return () => abortController.abort();
  }, []);  



  const handleFlip = () => {
    {cardSide === "1" ? setCardSide("2") : setCardSide("1") }
  };

  const handleNext = () => {
    //keep iterating if cards are available
    if (cardCounter+1<cardCount) {
    setCardCounter(cardCounter+1)
    setCard(cards[cardCounter+1])
    setCardSide("1")
    }
    else  
    //if not, prompt user to start over
    {const result = window.confirm("Restart Cards? Click 'cancel' to return to the home page.");
    if (result) {
      setCardCounter(0);
      setCard(cards[0])
      setCardSide("1")
    }
    else {
      history.push("/");
    }
  }}

//only show the cards if >2, otherwise show "not enough cards"
  if (cardCount >2) {
    return (
    <div className="card">
      <div className="card-body">
      <h5 class="card-title">Card {cardCounter+1} of {cardCount}</h5>
        <p className="card-text">{cardSide === "1" ? card.front : card.back}</p>
        <button className="btn btn-warning" onClick={handleFlip}>Flip</button>
        {cardSide === "2" 
        ? <button className="btn btn-primary" onClick={handleNext}>Next</button>
        : <></>
      }
      </div>
    </div>
    );
  }

return (
<div>
<h2>Not Enough Cards.</h2>
<p>You need at least 3 cards to study</p>
<Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
</div>
)
};



export default CardStudy;
