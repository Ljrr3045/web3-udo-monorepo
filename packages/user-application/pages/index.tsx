import type { NextPage } from "next";
import { Card } from "../components/common/Card";

const Home: NextPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card>
        Hello world
      </Card>
    </div>
  );
};

export default Home;
