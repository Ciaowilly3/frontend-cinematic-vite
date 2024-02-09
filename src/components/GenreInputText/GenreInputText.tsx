import React from "react";

type GenreInputTextProps = {
  onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const GenreInputText = ({ onChangeFunction }: GenreInputTextProps) => {
  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="genre"
        id="genre"
        name="genre"
        onChange={(e) => onChangeFunction(e)}
      />
    </div>
  );
};

export default GenreInputText;
