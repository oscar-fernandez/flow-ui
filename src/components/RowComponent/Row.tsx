import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ITechnology from "../../models/interfaces/ITechnology";
import "./Row.css";
import {
  shortenStringList,
  convertToStringArr,
  tooltipString,
} from "../../utils/utilityFunctions";

interface RowProps {
  id: number;
  firstName: string;
  lastName: string;
  techStack: ITechnology[];
  onClick: () => void;
}

const Row = ({ id, firstName, lastName, techStack, onClick }: RowProps) => {
  const [useTechStack, setTechStack] = useState("");
  const strTechStack = useRef([""]);

  useEffect(() => {
    strTechStack.current = [...convertToStringArr(techStack)];
    setTechStack(shortenStringList(strTechStack.current));
  }, []);

  return (
    <>
      <div className="row-container" onClick={() => onClick()}>
        <p className="row-id">{id}</p>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <Tooltip title={tooltipString(strTechStack.current)} placement="bottom">
          <p data-testid="tech-stack">{useTechStack}</p>
        </Tooltip>

        <button
          className="delete-row-button"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <svg
            width="32"
            height="37"
            viewBox="0 0 32 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8438 29.75H20.5312C20.9531 29.75 21.375 29.3984 21.375 28.9062V13.7188C21.375 13.2969 20.9531 12.875 20.5312 12.875H18.8438C18.3516 12.875 18 13.2969 18 13.7188V28.9062C18 29.3984 18.3516 29.75 18.8438 29.75ZM30.375 6.125H24.5391L22.1484 2.1875C21.5859 1.20312 20.4609 0.5 19.2656 0.5H12.1641C10.9688 0.5 9.84375 1.20312 9.28125 2.1875L6.89062 6.125H1.125C0.492188 6.125 0 6.6875 0 7.25V8.375C0 9.00781 0.492188 9.5 1.125 9.5H2.25V33.125C2.25 35.0234 3.72656 36.5 5.625 36.5H25.875C27.7031 36.5 29.25 35.0234 29.25 33.125V9.5H30.375C30.9375 9.5 31.5 9.00781 31.5 8.375V7.25C31.5 6.6875 30.9375 6.125 30.375 6.125ZM12.0234 4.08594C12.0938 4.01562 12.2344 3.875 12.375 3.875C12.375 3.875 12.375 3.875 12.4453 3.875H19.0547C19.1953 3.875 19.3359 4.01562 19.4062 4.08594L20.6016 6.125H10.8281L12.0234 4.08594ZM25.875 33.125H5.625V9.5H25.875V33.125ZM10.9688 29.75H12.6562C13.0781 29.75 13.5 29.3984 13.5 28.9062V13.7188C13.5 13.2969 13.0781 12.875 12.6562 12.875H10.9688C10.4766 12.875 10.125 13.2969 10.125 13.7188V28.9062C10.125 29.3984 10.4766 29.75 10.9688 29.75Z"
              fill="#DC8D0B"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Row;
