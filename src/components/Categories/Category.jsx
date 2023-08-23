import React, { useState } from 'react'
import "./category.css"
import axios from 'axios';

export default function Category() {

    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategory = {
            name,
        };

        try {
            await axios.post("/category/", newCategory);
            window.location.reload("/category");
        } catch (error) {}
    }; 

  return (
    <div className="category">
      <form className="categoryForm" onSubmit={handleSubmit}>
        <div className="categoryFormGroup">
          <label htmlFor="fileInput">
            <i className="categoryIcon fa-solid fa-plus"></i>
          </label>
          <input
            className="categoryInput"
            type="text"
            placeholder="New Category"
            autoFocus={true}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="categorySubmit" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
