import React, { useEffect, useState } from 'react'
import '../css/catalog.css'

export default function Catalog(props) {
  const [books, setBooks] = useState(props.catalogdata);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedPublicationDate, setSelectedPublicationDate] = useState("");

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handlePublicationDateChange = (event) => {
    setSelectedPublicationDate(event.target.value);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearchQuery = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "" || book.category === selectedGenre;

    const matchesPriceRange =
      selectedPriceRange === "" ||
      (selectedPriceRange === "under10" && book.price < 10) ||
      (selectedPriceRange === "10to20" && book.price >= 10 && book.price <= 20) ||
      (selectedPriceRange === "over20" && book.price > 20);

    const matchesPublicationDate =
      selectedPublicationDate === "" ||
      book.publicationDate >= selectedPublicationDate;

    return (
      matchesSearchQuery &&
      matchesGenre &&
      matchesPriceRange &&
      matchesPublicationDate
    );
  });

  useEffect(() => {
    console.log(books)
  }, [props])

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        {/* Genre Filter */}
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          {/* Add more genre options */}
        </select>
        {/* Price Range Filter */}
        <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
          <option value="">All Prices</option>
          <option value="under10">Under $10</option>
          <option value="10to20">$10 - $20</option>
          <option value="over20">Over $20</option>
          {/* Add more price range options */}
        </select>
        {/* Publication Date Filter */}
        <input
          type="date"
          value={selectedPublicationDate}
          onChange={handlePublicationDateChange}
        />
      </div>
      <div>
        <section className='book_section'>
          <div className='container'>
            <div className='row'>
              {filteredBooks.length === 0 ? <h1 className='nodatafound'>books not found!</h1>
                : filteredBooks.map((book) =>
                  <div className='col-xl-2 col-lg-4 col-md-6 col-sm-12 main-data-box' key={book.id}>
                    <img className='image' src={book.coverImage} alt="bookcover" />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                    <p>Price: ${book.price}</p>
                    <p>Ratings: {book.ratings}</p>
                  </div>
                )
              }

            </div>

          </div>

        </section>
      </div>

    </>
  )
}

