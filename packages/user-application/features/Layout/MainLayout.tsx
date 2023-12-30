import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="w-full h-screen flex flex-col items-center justify-center p-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}