import React,  { useEffect, useState } from "react";
import Header from "./Header";
import DeckCreate from "./DeckCreate"
import CardCreate from "./CardCreate"
import CardEdit from "../Card/CardEdit"
import DeckList from "../Deck/DeckList"
import DeckView from "../Deck/DeckView"
import DeckEdit from "../Deck/DeckEdit"
import DeckStudy from "../Deck/DeckStudy"
import CardStudy from "../Card/CardStudy"
import NotFound from "./NotFound"

import { Route, Switch} from "react-router-dom";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        
        <Switch>
          <Route exact={true} path="/">
            <DeckList />
          </Route>

          <Route path={`/decks/new`}>
            <DeckCreate />
          </Route>

          <Route path={`/decks/:deckId/cards/new`}>
            <CardCreate />
          </Route>

          <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <CardEdit />
          </Route>

          <Route path={`/decks/:deckId/edit`}>
            <DeckEdit />
          </Route>

          <Route path={`/decks/:deckId/study`}>
            <DeckStudy />
            <CardStudy />
          </Route>

          <Route path={`/decks/:deckId`}>
            <DeckView />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>


      </div>
    </>
  );
}

export default Layout;
