import { render } from "@testing-library/react";
import { useState } from "react";
import "./PageNumberCarousel.css";

function PageNumberCarousel() {
  const [currentPageNumber, setPage] = useState(1);

  // This is used for debugging to see the current page number
  // eslint-disable-next-line no-console
  console.log("Current Page Number: " + currentPageNumber);

  // This method updates the current page to go back a page
  const updatePageBack = () => {
    // If the user is on the first page they cannot go back to a previous page.
    if (currentPageNumber === 1) {
      setPage(1);
    } else {
      setPage(currentPageNumber - 1);
    }

    // Used for debugging updated page number
    // eslint-disable-next-line no-console
    console.log("Updated Page Number: " + currentPageNumber);
  };

  // This method updates the current page to go forward a page
  const updatePageForward = () => {
    setPage(currentPageNumber + 1);

    // Used for debugging updated page number
    // eslint-disable-next-line no-console
    console.log("Updated Page Number: " + currentPageNumber);
  };

  return (
    <>
      <div className="component">
        <div className="carousel">
          <div className="arrow" onClick={updatePageBack}>
            <a href="#">
              <svg
                id="arrow-inside"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000048"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="#e5e5e5"
                className="w-6 h-6"
                height={"32px"}
                width={"auto"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </a>
          </div>

          <div className="numbers">
            <a className="number">1</a>
            <a className="number">2</a>
            <a className="number">3</a>
            <a className="number">4</a>
            <p className="dots">...</p>
            <a className="number">5</a>
          </div>

          <div className="arrow" onClick={updatePageForward}>
            <a href="#">
              <svg
                id="arrow-inside"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="#e5e5e5"
                className="w-6 h-6"
                height={"32px"}
                width={"auto"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="section-search-pagenumber">
          <input
            className="input-pagenumber"
            type="text"
            placeholder="Go to page ..."
          />
          <button className="input-go">Go</button>
        </div>
      </div>
    </>
  );
}

export default PageNumberCarousel;
