import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";

function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [popularData, setPopularData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [photoSearch, setPhotoSearch] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    fetch(
      `https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/?user=&q=${searchWord}&size=6&suggestions=1&maxSuggestions=6`
    )
      .then((response) => response.json())
      .then((res) => {
        setFilteredData(res.suggestions);
        if (topData.length == 0) setTopData(res.facets.collectionname);
        setPopularData(res.results);
        setPhotoSearch(searchWord.toUpperCase());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHover = (suggestion) => {
    const srch = suggestion.split(" ").join("%20");
    fetch(
      `https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/?user=&q=${srch}&size=6&suggestions=1&maxSuggestions=6`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(photoSearch);
        setPhotoSearch(suggestion.toUpperCase());
        setPopularData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="suggestWin">
          <div className="searchBox">
            <div className="lftRow">
              <div className="topSearch">
                <h4 className="topSearchHead">TOP SEARCHES</h4>
                <div>
                  {filteredData?.map((value, index) => {
                    return (
                      <a
                        className="dataItem"
                        key={index}
                        onMouseOver={() =>
                          handleHover(value.suggestion.toLowerCase())
                        }
                      >
                        <p>{value.suggestion.toLowerCase()} </p>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="topCollections">
                <h4 className="topCollectionsHead"> TOP COLLECTIONS</h4>
                <div>
                  {topData?.map((value, index) => {
                    return (
                      <a
                        className="dataItem"
                        key={index}
                        onMouseOver={() =>
                          handleHover(value.name.toLowerCase())
                        }
                      >
                        <p>{value.name.toLowerCase()}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="rghtAlgn">
            <h4 className="topPopularHead">
              POPULAR PRODUCTS IN ' {photoSearch.toUpperCase()} '
            </h4>
            <div className="board">
              {popularData?.map((value, index) => {
                return (
                  <div className="card" key={index}>
                    <img
                      src={value.productimage}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `https://www.royaloakindia.com/product/${value.productname
                          .split(" ")
                          .join("-")}`;
                      }}
                    />
                    <div>
                      {value.productname.toUpperCase().slice(0, 15)}
                      {"..."}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        color: "#1d6bb8",
                        alignItems: "center",
                      }}
                    >
                      Rs. {value.pricewithoutdiscount}
                      <div
                        style={{
                          textDecorationLine: "line-through",
                          color: "gray",
                          fontSize: ".8em",
                          paddingLeft: ".5rem",
                        }}
                      >
                        Rs. {value.mrpprice}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="btnContainer">
                <button
                  className="btnCls"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `https://www.royaloakindia.com/search-new?q=${wordEntered}`;
                  }}
                >
                  View All Search Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SearchBar;
