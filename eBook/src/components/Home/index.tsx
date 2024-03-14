import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Home = () => {
  const { AllBooks } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["Science", "Comedy", "Thriller"];
  const filteredBooks =
    selectedCategory === "All"
      ? AllBooks
      : AllBooks.filter((book) => book.category === selectedCategory);

  return (
    <div className="container mt-12 flex justify-center flex-col items-center gap-12">
      <FormControl className="w-1/4 mt-4 md:z-0 -z-30">
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          name="category"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="flex gap-14 flex-wrap justify-center">
        {filteredBooks.map((book) => (
          <div key={book._id}>
            <div className="h-[300px]">
              <img
                src={book.image.url}
                alt="image"
                className="h-full"
                loading="lazy"
              />
            </div>
            <div className="text-center mt-4">
              <h1>{book.name}</h1>
              <p>{book.category}</p>
            </div>
            <Link
              to={`/book/${book._id}`}
              className="flex justify-center items-center mb-8"
            >
              <button className="bg-mainColor border-2 loginBtn border-mainColor hover:bg-white hover:text-mainColor/90 text-white rounded-md duration-300 transition-colors p-2 mt-4">
                Read the book
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
