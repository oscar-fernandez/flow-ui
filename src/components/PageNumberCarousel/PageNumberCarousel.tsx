import React, { useEffect, useState } from "react";
import "./PageNumberCarousel.css";

interface Props {
  totalPages: number;
}

// Use the following functional component below like the following
// totalPages will eventually be an API call however and not static.
// <PageNumberCarousel totalPages={10}/>
const PageNumberCarousel = ({ totalPages }: Props) => {
  // this will be replaced by prop function from parent to update page
  const [currentPageNumber, setPage] = useState(1);
  const [disableBack, setDisableBack] = useState(true);
  const [disableForward, setDisableForward] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [invalidPageRange, setIsInvalidPageRange] = useState(false);

  // This method updates the current page to go back a page
  const updatePageBack = () => {
    // If the user is on the first page they cannot go back to a previous page.
    setDisableForward(false);
    if (currentPageNumber === 2) {
      setPage(1);
      setDisableBack(true);
    } else {
      setPage(currentPageNumber - 1);
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

  // Page number from anchor tag needs to be converted to type number
  const getNumber = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const pageNumber = Number(e.currentTarget.text);
    goToPage(pageNumber);
  };

  // Called by clicking on page number anchors or submitting number by form
  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
    if (pageNumber === 1) {
      setDisableBack(true);
      disableForward && setDisableForward(false);
    } else if (pageNumber === totalPages) {
      setDisableForward(true);
      disableBack && setDisableBack(false);
    } else {
      disableBack && setDisableBack(false);
      disableForward && setDisableForward(false);
    }
  };

  // Handles state for 'Go to page' form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Ensures input number is within range and resets input value
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const pageNumber = Number(inputValue);
    if (1 <= pageNumber && pageNumber <= totalPages) {
      goToPage(pageNumber);
      setInputValue("");
      setIsInvalidPageRange(false);
    } else {
      setIsInvalidPageRange(true);
    }
  };

  useEffect(() => {
    if (totalPages === currentPageNumber) {
      setDisableForward(true);
    }
  });

  return (
    <>
      <div className="component-margin">
        <div className="component">
          <div className="carousel">
            <button
              className="arrow"
              onClick={updatePageBack}
              disabled={disableBack}
              aria-label="Previous page"
            >
              <svg
                id="arrow-inside"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="#f8f9fa"
                className="arrow-stroke"
                height={"15px"}
                width={"15x"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>

            <div className="numbers">
              {/* shows page 1 */}
              <a
                onClick={getNumber}
                className={`number ${currentPageNumber === 1 ? "active" : ""}`}
              >
                1
              </a>
              {totalPages < 5 ? (
                <>
                  {totalPages > 1 ? (
                    <a
                      onClick={getNumber}
                      className={`number ${
                        currentPageNumber === 2 ? "active" : ""
                      }`}
                    >
                      2
                    </a>
                  ) : null}
                  {totalPages > 2 ? (
                    <a
                      onClick={getNumber}
                      className={`number ${
                        currentPageNumber === 3 ? "active" : ""
                      }`}
                    >
                      3
                    </a>
                  ) : null}

                  {totalPages > 3 ? (
                    <a
                      onClick={getNumber}
                      className={`number ${
                        currentPageNumber === 4 ? "active" : ""
                      }`}
                    >
                      4
                    </a>
                  ) : null}
                </>
              ) : null}

              {/* toggle the dots to display if page is greater than 3 and if total pages is greater than 4 */}
              {currentPageNumber > 3 && totalPages > 4 ? (
                <p className="dots">...</p>
              ) : (
                <p> </p>
              )}

              {/* displays left sibling if total pages is greater than 4*/}
              {totalPages > 4 ? (
                <a
                  onClick={getNumber}
                  className={`number ${
                    currentPageNumber === 2 ? "active" : ""
                  }`}
                >
                  {currentPageNumber < 2
                    ? currentPageNumber + 1
                    : currentPageNumber === 2
                    ? 2
                    : currentPageNumber < totalPages - 2
                    ? currentPageNumber - 1
                    : totalPages - 3}
                </a>
              ) : null}

              {/* displays current middle if total pages is less than 5*/}
              {totalPages < 5 ? (
                " "
              ) : (
                <a
                  onClick={getNumber}
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
              )}

              {/* displays right sibling if total pages is greater than 4*/}
              {totalPages > 4 ? (
                <a
                  onClick={getNumber}
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
              ) : null}

              {/* toggles dots to not show if current page is 2 away from the end or if total pages is less than 5 */}
              {currentPageNumber >= totalPages - 2 || totalPages < 5 ? (
                "   "
              ) : (
                <p className="dots">...</p>
              )}
              {totalPages < 5 ? null : (
                <a
                  onClick={getNumber}
                  className={`number ${
                    currentPageNumber === totalPages ? "active" : ""
                  }`}
                >
                  {totalPages}
                </a>
              )}
            </div>

            <button
              className="arrow"
              onClick={updatePageForward}
              disabled={disableForward}
              aria-label="Next page"
            >
              <svg
                id="arrow-inside"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="#f8f9fa"
                className="arrow-stroke"
                height={"15px"}
                width={"15px"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
          <div className="input-page-divider">
            {invalidPageRange ? (
              <div className="input-error-main">* Invalid Page Number</div>
            ) : null}
            <form className="section-search-pagenumber">
              <input
                className="input-pagenumber"
                type="text"
                placeholder="Go to page ..."
                value={inputValue}
                onChange={handleChange}
              />
              <button className="input-go" type="submit" onClick={handleSubmit}>
                Go
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNumberCarousel;
