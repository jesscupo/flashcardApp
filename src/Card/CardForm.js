import React from "react";
import {  Link } from "react-router-dom";
import { Route, Switch, useHistory } from "react-router-dom";


function CardForm({handleSubmit, handleChange, formData }) {
 const history = useHistory();

  return (
    <form name="update" onSubmit={handleSubmit}>
      <table>
      <thead>
          <tr>
            <th>Front</th>
            <th>Back</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 
          <textarea
            id="front"
            name="front"
            onChange={handleChange}
            value={formData.front}
            placeholder="Front"
          />
        </td>
        <td> 
          <textarea
            id="back"
            name="back"
            onChange={handleChange}
            value={formData.back}
            placeholder="Back"
          />
        </td>
            <td>
        <Switch>

            <Route path={`/decks/:deckId/cards/:cardId/edit`}>
              <button className="btn btn-primary" type="submit">Save</button>
              <Link to={`/`} className="btn btn-warning">Cancel</Link>
            </Route>

            <Route path={`/decks/:deckId/cards/new`}>
              <button className="btn btn-primary" type="submit">Save</button>
              <button onClick={history.goBack} type="button" className="btn btn-warning">Done</button>
            </Route>

        </Switch>
            </td>
          </tr>
        </tbody>
      </table>
    </form>

  );
}

export default CardForm;
