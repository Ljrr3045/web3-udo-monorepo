import React from "react";
import { Bar } from "../../components/Layout/Bar";

export const Footer = () => {
  const LeftData = [
    {
      text: "University of Oriente, 2024",
      onclick: () => {
        window.open("https://x.com/dacemonagas?s=20", "_blank");
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
        text: "MumbaiScan",
        onclick: () => {
          window.open("https://mumbai.polygonscan.com/address/0x25dcD86B0948703b7Ced7BD531BE723e86daFCDF", "_blank");
        }
      }
  ];

  return (
    <Bar>
      <div className="flex flex-row items-center gap-2 text-white">
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
      <div className="flex flex-row items-center gap-2 text-white">
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
