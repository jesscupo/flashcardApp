import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api";
import { useParams, useHistory, Link} from "react-router-dom";
import CardForm from "../Card/CardForm"


function CardCreate() {
  const { deckId } = useParams();

  //form is blank to start
  const initialFormState = {
    front: '',
    back: ''
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [deckName, setDeckName] = useState([]);
  const [error, setError] = useState(undefined);

//on load, get the deck name to be used in the nav bar
    useEffect(() => {
      const abortController = new AbortController();
      readDeck(deckId).then((deck)=>setDeckName(deck.name))
      .catch(setError)
      return () => abortController.abort();
    }, []);  

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

//save = create the new card
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData({ ...initialFormState });
  };

  return (
    <div className="container">
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
  <h2>Add Card</h2>
  <CardForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData}/>
    </div>
  );
}

export default CardCreate;
