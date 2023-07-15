import React, { useState } from "react";
import KeywordInput from "./KeywordInput";
import KeywordChips from "./KeywordChips";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const [keywords, setKeywords] = useState([]);
  const [watchlistSymbols, setWatchlistSymbols] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleKeywordAdd = (keyword) => {
    setKeywords([...keywords, keyword]);
    setAddButtonDisabled(false);
  };

  const handleKeywordDelete = (keyword) => {
    const updatedKeywords = keywords.filter((kw) => kw !== keyword);
    setKeywords(updatedKeywords);
  };

  const handleKeywordEdit = (oldKeyword, newKeyword) => {
    const updatedKeywords = keywords.map((kw) =>
      kw === oldKeyword ? newKeyword : kw
    );
    setKeywords(updatedKeywords);
  };

  const queryAPI = async () => {
    try {
      if (keywords.length > 0) {
        setLoading(true);
        const response = await fetch(
          `https://dry-sierra-74830-5a964941c479.herokuapp.com/api/search?keywords=${keywords.join(
            ","
          )}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.watchlistSymbols === "string") {
            const symbolsArray = data.watchlistSymbols.split(",");
            setWatchlistSymbols([...symbolsArray]);
            setErrorMessage("");
            setCopied(false);
          } else {
            console.error(
              "API response does not contain valid watchlistSymbols:",
              data
            );
            setWatchlistSymbols([]);
            setErrorMessage("An error occurred while searching for keywords.");
          }
        } else {
          console.error("API query failed:", response.statusText);
          setWatchlistSymbols([]);
          setErrorMessage("An error occurred while querying the API.");
        }
      } else {
        setWatchlistSymbols([]);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("API query failed:", error);
      setWatchlistSymbols([]);
      setErrorMessage("An error occurred while querying the API.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const content = watchlistSymbols.join(",");
    navigator.clipboard.writeText(content);
    setCopied(true);
  };

  const handleCloseSnackbar = () => {
    setErrorMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <KeywordInput
          onKeywordAdd={handleKeywordAdd}
          disabled={addButtonDisabled}
        />
        <KeywordChips
          keywords={keywords}
          onKeywordDelete={handleKeywordDelete}
          onKeywordEdit={handleKeywordEdit}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={queryAPI}
          disabled={loading || keywords.length === 0}
        >
          {loading ? <CircularProgress size={20} /> : "Query"}
        </Button>
        {watchlistSymbols.length > 0 && (
          <div style={{ maxWidth: "200px" }}>
            <h3>Watchlist Symbols:</h3>
            <p>{watchlistSymbols.join(",")}</p>
            {watchlistSymbols.length > 10 && (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCopy}
                disabled={copied}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
        )}
        <Snackbar
          open={errorMessage !== ""}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MuiAlert severity="error" onClose={handleCloseSnackbar}>
            {errorMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default App;
