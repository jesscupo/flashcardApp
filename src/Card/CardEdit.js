import React,  { useEffect, useState } from "react";
import { readCard, updateCard, readDeck } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";
import CardForm from "./CardForm"

function CardEdit() {
    let { cardId } = useParams();
    let { deckId }= useParams();
    const history = useHistory();
    const [error, setError] = useState(undefined);
  
    const [formData, setFormData] = useState([]);
    const [deckName, setDeckName] = useState([]);

    //on load, read the card info into the form
    useEffect(() => {
      const abortController = new AbortController();
      readCard(cardId, abortController.signal).then((card)=> {
        setFormData(card);
        //get deck name for navigation bar
        readDeck(card.deckId).then((deck)=>setDeckName(deck.name));
      })
      .catch(setError)
      return () => abortController.abort();
    }, []);  

    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };
      

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(formData);
    history.goBack() ;
  };

  return (
    <div className="container">
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
        </ol>
      </nav>    
    <CardForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData}/>
    </div>
  );
}

export default CardEdit;
