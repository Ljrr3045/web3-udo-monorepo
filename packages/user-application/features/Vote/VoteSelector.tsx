import React, { useState, useEffect } from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { CgArrowRightR, CgSmile } from "react-icons/cg";
import { RadioButtonGroup } from "../../components/Common/RadioButtonGroup";
import { Button } from "../../components/Common/Button";
import { useVote } from "./Hooks/useVote";

export const VoteSelector = () => {
  const [showVoteOption, setShowVoteOption] = useState<boolean>(false);
  const { isWalletAlreadyVoted } = useVote({});

  useEffect(() => {
    if (isWalletAlreadyVoted) {
      setShowVoteOption(false);
    } else {
      setShowVoteOption(true);
    }
  }, [isWalletAlreadyVoted]);

  return (
    <WidgetCard
      title="Vote"
    >
      {!showVoteOption && (
        <UserAlreadyVoted />
      )}
      {showVoteOption && (
        <UserNotVoted />
      )}
    </WidgetCard>
  );
}

/* Internal components */
const UserNotVoted = () => {
  const [selectedOption, setSelectedOption] = useState<string>("0");
  const { sendTransaction } = useVote({ value: selectedOption });

/* Handlers */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

/* Options */
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

  return (
    <>
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <CgArrowRightR
          size={25}
          className="text-blue-600"
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
        onClick={sendTransaction}
      />
    </>
  );
}

const UserAlreadyVoted = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-2">
        <CgSmile
          size={100}
          className="text-blue-600"
        />
        <p className="text-normal font-bold text-black text-start zero:max-w-[260px] 2md:max-w-none">
          {`You already voted this month, thank you!`}
        </p>
      </div>
    </>
  );
}
