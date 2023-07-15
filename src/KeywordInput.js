import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const KeywordInput = ({ onKeywordAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddKeyword = () => {
    if (inputValue.trim() !== '') {
      onKeywordAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div>
      <TextField
        label="Enter a keyword"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleAddKeyword();
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={handleAddKeyword}>
        Add
      </Button>
    </div>
  );
};

export default KeywordInput;
