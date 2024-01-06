import React, { useState } from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { CgArrowRightR } from "react-icons/cg";
import { RadioButtonGroup } from "../../components/Common/RadioButtonGroup";
import { Button } from "../../components/Common/Button";

export const VoteSelector = () => {
  const [selectedOption, setSelectedOption] = useState("0");

  const optionsToVote = [
    {
      value: "0",
      label: "University",
    },
    {
      value: "1",
      label: "Teachers",
    },
    {
      value: "2",
      label: "Students",
    }
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <WidgetCard
      title="Vote"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <CgArrowRightR
          size={25}
          color="#2563eb"
        />
        <p className="text-sm font-normal text-black text-start zero:max-w-[260px] 2md:max-w-none">
          {`Which sector of the University of de Oriente do you want to receive funds this month?`}
        </p>
      </div>
      <RadioButtonGroup
        options={optionsToVote}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <Button
        text="Send Vote"
        onClick={() => console.log("Send bote")}
      />
    </WidgetCard>
  );
}
