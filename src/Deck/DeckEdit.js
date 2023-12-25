import React,  { useEffect, useState } from "react";
import {  updateDeck } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckEdit() {
    const { deckId } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState([]);
    const [deck, setDeck] = useState([]);
    const [error, setError] = useState(undefined);
  
    //on load, read the deck info into the form
    useEffect(() => {
        
      const abortController = new AbortController();
      readDeck(deckId, abortController.signal)
          .then((deck)=>{
            setDeck(deck);
            setFormData({name: deck.name, description: deck.description});
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

//update deck on submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck({id: deckId, name: formData.name, description: formData.description});
    history.goBack() ;
  };

  return (
    <div className="container">
  <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
      </ol>
    </nav>
<h2>Edit Deck</h2>
    <form name="update" onSubmit={handleSubmit}>
      <table>
      <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 
          <input
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Name"
          />
        </td>
        <td> 
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Description"
          />
        </td>
            <td>
              <button className="btn btn-primary" type="submit">Save</button>
              <Link to={`/`} className="btn btn-warning">Cancel</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
  );
}

export default DeckEdit;
