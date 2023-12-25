import React , {useState, useEffect} from "react";
import DeckHome from "./DeckHome";
import {Link} from "react-router-dom";
import {listDecks} from "../utils/api"
import NotFound from "../Layout/NotFound"

export const DeckList = ( ) => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

//load list of decks to the home page
useEffect(() => {
  const abortController = new AbortController();
  listDecks(abortController.signal).then(setDecks).catch(setError);
  return () => abortController.abort();
}, []);

if (error) {
  return <NotFound />;
}

//create each individual deck card for the home page
  const list = decks.map((deck) => <DeckHome key={deck.id} deck={deck} deckId={deck.id} />);

  return ( 
    <main className="container">
    <Link className="btn btn-primary" to={`/decks/new`}>Create Deck</Link>
      <section className="row">{list}</section>
    </main>
  );
};

export default DeckList;
