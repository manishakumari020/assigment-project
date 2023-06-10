import React from "react";

const Card = ({ card }) => {
  const {
    name,
    budget_name,
    spent,
    available_to_spend,
    card_type,
    expiry,
    limit,
    status
  } = card;

  const renderCardContent = () => {
    if (card_type === "burner") {
      return (
        <div>
          <div>Expiry: {expiry}</div>
          <div>Other burner card details...</div>
        </div>
      );
    } else if (card_type === "subscription") {
      return (
        <div>
          <div>Limit: {limit}</div>
          <div>Other subscription card details...</div>
        </div>
      );
    }
  };

  return (
    <div className="card">
      <div className="card-type">{card_type}</div>
      <div className="card-name">{name}</div>
      <div className="budget-name">{budget_name}</div>
      <div className="spent">
        Spent: {spent.value} {spent.currency}
      </div>
      <div className="available-to-spend">
        Available to spend: {available_to_spend.value}{" "}
        {available_to_spend.currency}
      </div>
      {renderCardContent()}
      <div className="card-status">{status}</div>
    </div>
  );
};

export default Card;
