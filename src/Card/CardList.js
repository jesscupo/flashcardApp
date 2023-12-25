import React, { useState, useEffect} from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";
import Card from "./Card"


export const CardList = ({deck}) => {

  const list = deck.cards.map((card) => <Card key={card.id} card ={card} cardId={card.id}  />);

  return (
    <main className="container">
      <section className="row">{list}</section>
    </main>
  );
};

export default CardList;
