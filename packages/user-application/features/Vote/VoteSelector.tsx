import React, { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { CgArrowRightR, CgSmile, CgSpinnerAlt } from "react-icons/cg";
import { RadioButtonGroup } from "../../components/Common/RadioButtonGroup";
import { Button } from "../../components/Common/Button";
import { useVote } from "./Hooks/useVote";

export const VoteSelector = () => {
  const [showVoteOption, setShowVoteOption] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const { isWalletAlreadyVoted, isWalletAlreadyVotedLoading } = useVote({});

/* Effects */
  useEffect(() => {
    if (isWalletAlreadyVoted) {
      setShowVoteOption(false);
    } else {
      setShowVoteOption(true);
    }
  }, [isWalletAlreadyVoted]);

  useEffect(() => {
    if (isWalletAlreadyVotedLoading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isWalletAlreadyVotedLoading]);

  return (
    <WidgetCard
      title="Vote"
    >
      {(showSpinner) && (
        <CgSpinnerAlt
          size={50}
          className="loading-icon text-blue-600"
        />
      )}
      {(!showVoteOption && !showSpinner) && (
        <UserAlreadyVoted />
      )}
      {(showVoteOption && !showSpinner) && (
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
  const [isExploding, setIsExploding] = useState<boolean>(false);

  /* Handlers */
  const handleClick = () => {
    setIsExploding(true);
  };

  /* Effects */
  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
      }, 2200);
    }
  }, [isExploding]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-4">
        {isExploding && (
          <ConfettiExplosion
            className="fixed inset-0 w-full min-h-screen"
            width={5000}
            height={5000}
            particleCount={300}
          />
        )}
        <div className="w-full flex flex-col items-center justify-start gap-1">
          <CgSmile
            size={100}
            className="text-blue-600"
          />
          <p className="text-base font-bold text-black text-center">
            {`You already voted this month.`}
          </p>
        </div>
        <Button
          text="Thank You!"
          onClick={handleClick}
        />
      </div>
    </>
  );
}
