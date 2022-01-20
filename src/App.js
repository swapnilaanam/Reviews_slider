import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [reviews, setReviews] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let lastIndex = reviews.length - 1;

    if (index > lastIndex) {
      setIndex(0);
    }

    if (index < 0) {
      setIndex(lastIndex);
    }
  }, [index, reviews]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <header className="title">
        <h2>
          <span>/</span> Our Reviews
        </h2>
      </header>
      <div className="section-center">
        {reviews.map((review, currentIndex) => {
          let { id, image, name, title, quote } = review;

          let position = "nextSlide";

          if (currentIndex === index) position = "activeSlide";
          if (
            currentIndex === index - 1 ||
            (index === 0 && currentIndex === reviews.length - 1)
          )
            position = "lastSlide";

          return (
            <article className={position} key={id}>
              <img src={image} alt={title} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button
          type="button"
          className="prev"
          onClick={() => setIndex(index - 1)}
        >
          <FiChevronLeft />
        </button>
        <button
          type="button"
          className="next"
          onClick={() => setIndex(index + 1)}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
