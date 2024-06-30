"use client";

import { Particles } from "../components/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Sidhant Singh Rathore",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
  },
];

export const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ff0000"); // Default color is red
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setColor(theme === "dark" ? "#ff0000" : "#800080"); // Purple in dark theme, red in light theme
  }, [theme]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="overflow-hidden relative flex lg:w-auto h-screen items-center justify-center md:shadow-xl">
      <div className="pointer-events-none z-10 text-center">
        <span className="block whitespace-pre-wrap text-2xl font-semibold leading-none text-neutral-800 dark:text-neutral-200 md:text-4xl">
          "{quote.text}"
        </span>
        <span className="block mt-2 text-lg font-medium text-neutral-600 dark:text-neutral-400 md:text-2xl italic text-right pr-4">
          - {quote.author}
        </span>
      </div>
      <Particles
        className="absolute inset-0"
        quantity={300}
        ease={100}
        color={color}
        refresh
      />
    </div>
  );
};
