import React from "react";
import Chip from "@mui/material/Chip";

const KeywordChips = ({ keywords, onKeywordDelete, onKeywordEdit }) => {
  const handleDeleteKeyword = (keyword) => {
    onKeywordDelete(keyword);
  };

  const handleEditKeyword = (oldKeyword, newKeyword) => {
    onKeywordEdit(oldKeyword, newKeyword);
  };

  return (
    <div>
      {keywords.map((keyword, index) => (
        <Chip
          key={index}
          label={keyword}
          onDelete={() => handleDeleteKeyword(keyword)}
          onClick={() => {
            const newKeyword = prompt("Edit the keyword:", keyword);
            if (newKeyword) {
              handleEditKeyword(keyword, newKeyword);
            }
          }}
        />
      ))}
    </div>
  );
};

export default KeywordChips;
