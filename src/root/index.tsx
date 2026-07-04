import { Header } from "../components/Header";

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main
        aria-label="Dashboard content"
        className="min-h-[calc(100vh-4.5rem)] bg-[#f7f8fc]"
      />
    </div>
  );
};
