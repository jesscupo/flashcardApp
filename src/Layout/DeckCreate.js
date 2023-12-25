import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { useHistory, Link } from "react-router-dom";


function DeckCreate() {

  const history = useHistory();
//form is blank to start
  const initialFormState = {
    name: '',
    description: ''
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  //on submit, grab the ID from newly created deck and send user to the deck's page
  const handleSubmit = async (event) => {
    event.preventDefault();
    createDeck(formData).then((newDeck)=>
    {
      setFormData({ ...initialFormState });
      history.push(`/decks/${newDeck.id}`)
    })
  };

  return (
  <div class="container">
  <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to={`/`}>Home</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
      </ol>
    </nav>
<h2>Create Deck</h2>
    <form name="create" onSubmit={handleSubmit}>
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
            placeholder="description"
          />
        </td>
            <td>
              <button className="btn btn-primary" type="submit">Create</button>
              <Link to={`/`} className="btn btn-warning">Cancel</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
  );
}

export default DeckCreate;
