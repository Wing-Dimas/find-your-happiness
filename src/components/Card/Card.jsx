import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { IconCopy } from "@tabler/icons-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const defaultEndPoint = {
  joke: "https://official-joke-api.appspot.com/random_joke", // setup, puncline
  quotes: "https://api.quotable.io/random", // content, author
  fact: "https://catfact.ninja/fact", // fact
};

const buttons = ["joke", "quotes", "fact"];

export default function Card({ data }) {
  const [category, setCategory] = useState("joke");
  const [results, setResults] = useState(data);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const text = useRef("");

  function handleThreeButton(name) {
    setCategory(name);
  }

  async function handleGenerate() {
    setError(false);
    setIsLoading(true);
    try {
      let res;
      let dataUpdate;
      switch (category) {
        case "joke":
          res = await fetch(defaultEndPoint.joke);
          const { setup, punchline } = await res.json();
          dataUpdate = { setup, punchline };
          break;
        case "quotes":
          res = await fetch(defaultEndPoint.quotes);
          const { content, author } = await res.json();
          dataUpdate = { content, author };
          break;
        case "fact":
          res = await fetch(defaultEndPoint.fact);
          const { fact } = await res.json();
          dataUpdate = { fact };
        default:
          break;
      }
      setResults((prev) => ({
        ...prev,
        ...dataUpdate,
      }));
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  }

  function handleCopy() {
    setIsCopied(true);
    let html = text.current.innerHTML;
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
    html = html.replace(/<\/div>/gi, "\n");
    html = html.replace(/<\/li>/gi, "\n");
    html = html.replace(/<li>/gi, "  *  ");
    html = html.replace(/<\/ul>/gi, "\n");
    html = html.replace(/<\/p>/gi, "\n");
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    html = html.replace(/<[^>]+>/gi, "");

    navigator.clipboard.writeText(html);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }

  return (
    <div className="w-full p-2 border rounded-xl">
      <div className="flex gap-2 w-full justify-between">
        {buttons.map((name, index) => (
          <Button
            key={index}
            handleClick={handleThreeButton.bind(this, name)}
            state={category === name}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </div>

      <div className="relative flex justify-center items-center text-center resize-none w-full mt-8 px-2 outline-none bg-slate-300 h-48 rounded-md overflow-y-auto pt-4">
        <button
          className="absolute top-2 right-2 text-sm text-slate-500 rounded-lg p-1 transition-all duration-700 hover:bg-slate-700 hover:text-white"
          onClick={handleCopy}
          data-tooltip-id="copied-tooltip"
          data-tooltip-content="Copy"
          data-tooltip-place="top"
          disabled={isCopied}
        >
          {!isCopied ? <IconCopy size={24} /> : "copied!"}
        </button>
        {!isLoading ? (
          !error ? (
            <p ref={text}>
              {category === "joke" ? (
                <>
                  <span>Setup : </span> {results.setup} <br />
                  <span>Punchline : </span> {results.punchline}
                </>
              ) : category === "quotes" ? (
                <>
                  {`"`}
                  {results.content}
                  {`"`} <br />- {results.author} -
                </>
              ) : (
                category === "fact" && <>{results.fact}</>
              )}
            </p>
          ) : (
            <>Try again a few minute</>
          )
        ) : (
          <>Loading ...</>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button handleClick={handleGenerate} disabled={isLoading}>
          Generate
        </Button>
      </div>
      <Tooltip id="copied-tooltip" />
    </div>
  );
}
