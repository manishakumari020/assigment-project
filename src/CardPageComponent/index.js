import React, { useState, useEffect } from "react";
import Card from "../CardComponent/index";
import api from "../api";

const CardPage = () => {
  const [activeTab, setActiveTab] = useState("Your");
  const [cardData, setCardData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    fetchCardData();
  }, []);

  const fetchCardData = async () => {
    try {
      const response = await api.getCards(page);
      const newData = response.data;
      setCardData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log("Error fetching card data:", error);
    }
  };

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollPosition === documentHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filteredCards = cardData.filter((card) => {
    return (
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterOption === "" || card.card_type === filterOption)
    );
  });

  const renderCards = () => {
    if (activeTab === "Your") {
      return filteredCards
        .filter((card) => card.owner_id === 1)
        .map((card) => <Card key={card.id} card={card} />);
    } else if (activeTab === "All") {
      return filteredCards.map((card) => <Card key={card.id} card={card} />);
    } else if (activeTab === "Blocked") {
      return filteredCards
        .filter((card) => card.status === "blocked")
        .map((card) => <Card key={card.id} card={card} />);
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabClick("Your")}>Your</button>
        <button onClick={() => handleTabClick("All")}>All</button>
        <button onClick={() => handleTabClick("Blocked")}>Blocked</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by card name"
        />
      </div>

      <div className="filter-dropdown">
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>

      <div className="card-list">{renderCards()}</div>
    </div>
  );
};

export default CardPage;
