import React from "react";
import { Bar } from "../../components/Layout/Bar";

export const Footer = () => {
  const data = [
    {
      text: "University of Oriente, 2024",
      onclick: () => {
        window.open("https://x.com/dacemonagas?s=20", "_blank");
      }
    },
    {
      text: "Github",
      onclick: () => {
        window.open("https://github.com/Ljrr3045/web3-udo-monorepo", "_blank");
      }
    }
  ];

  return (
    <Bar>
      {data.map((item, index) => (
        <p
          key={index}
          className="text-sm cursor-pointer select-none"
          onClick={item.onclick}
        >
          {item.text}
        </p>
      ))}
    </Bar>
  )
}
