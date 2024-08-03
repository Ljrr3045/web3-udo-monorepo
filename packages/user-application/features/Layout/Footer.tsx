import React from "react";
import { Bar } from "../../components/Layout/Bar";

export const Footer = () => {
  const LeftData = [
    {
      text: "University of Oriente, 2024",
      onclick: () => {
        window.open("https://x.com/dacemonagas", "_blank");
      }
    }
  ];

  const RightData = [
    {
      text: "Github",
      onclick: () => {
        window.open("https://github.com/Ljrr3045/web3-udo-monorepo", "_blank");
      }
    },
    {
        text: "Contract",
        onclick: () => {
          window.open("https://polygonscan.com/address/0x2969297cc328064D46e4D9FB6C632Daf4a927e59", "_blank");
        }
      }
  ];

  return (
    <Bar
      isHeader={false}
    >
      <div className="flex flex-row items-center gap-4 text-white">
        {LeftData.map((item, index) => (
          <p
            key={index}
            className="text-sm cursor-pointer select-none"
            onClick={item.onclick}
          >
            {item.text}
          </p>
        ))}
      </div>
      <div className="flex flex-row items-center gap-4 text-white">
        {RightData.map((item, index) => (
          <p
            key={index}
            className="text-sm underline cursor-pointer select-none"
            onClick={item.onclick}
          >
            {item.text}
          </p>
        ))}
      </div>
    </Bar>
  )
}
