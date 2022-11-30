import { useState } from "react";
import "./PageNumberCarousel.css";

interface Props {
  totalPages: number;
}

// This is how you can use the Page Number Carousel component.
// <PageNumberCarousel totalPages={10} />
const PageNumberCarousel: React.FC<Props> = ({ totalPages }) => {
  // this will be replaced by prop function from parent to update page
  const [currentPageNumber, setPage] = useState(1);
  const [disableBack, setDisableBack] = useState(true);
  const [disableForward, setDisableForward] = useState(false);

  // This method updates the current page to go back a page
  const updatePageBack = () => {
    // If the user is on the first page they cannot go back to a previous page.
    setDisableForward(false);
    if (currentPageNumber === 2) {
      setPage(1);
      setDisableBack(true);
    } else {
      setPage(currentPageNumber - 1);
      setDisableBack(false);
    }
  };

  // This method updates the current page to go forward a page
  const updatePageForward = () => {
    if (currentPageNumber === totalPages - 1) {
      setPage(totalPages);
      setDisableForward(true);
    } else {
      setPage(currentPageNumber + 1);
      setDisableBack(false);
    }
  };

  return (
    <>
      <div className="component">
        <div className="carousel">
          <button
            className="arrow"
            onClick={updatePageBack}
            disabled={disableBack}
          >
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
          </button>

          <div className="numbers">
            <a className={`number ${currentPageNumber === 1 ? "active" : ""}`}>
              1
            </a>
            {currentPageNumber > 2 ? <p className="dots">...</p> : <p> </p>}
            <a className={`number ${currentPageNumber === 2 ? "active" : ""}`}>
              {currentPageNumber < 2
                ? currentPageNumber + 1
                : currentPageNumber === 2
                ? 2
                : currentPageNumber < totalPages - 2
                ? currentPageNumber - 1
                : totalPages - 3}
            </a>
            <a
              className={`number ${
                currentPageNumber > 2 && currentPageNumber < totalPages - 1
                  ? "active"
                  : ""
              }`}
            >
              {currentPageNumber < 3
                ? 3
                : currentPageNumber < totalPages - 2
                ? currentPageNumber
                : totalPages - 2}
            </a>
            <a
              className={`number ${
                currentPageNumber === totalPages - 1 ? "active" : ""
              }`}
            >
              {currentPageNumber <= 2
                ? 4
                : currentPageNumber >= totalPages - 2
                ? totalPages - 1
                : currentPageNumber + 1}
            </a>
            {currentPageNumber >= totalPages - 2 ? (
              "   "
            ) : (
              <p className="dots">...</p>
            )}
            <a
              className={`number ${
                currentPageNumber === totalPages ? "active" : ""
              }`}
            >
              {totalPages}
            </a>
          </div>

          <button
            className="arrow"
            onClick={updatePageForward}
            disabled={disableForward}
          >
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
          </button>
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
};

export default PageNumberCarousel;
