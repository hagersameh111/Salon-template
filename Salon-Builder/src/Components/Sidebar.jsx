import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
      pathname === path ? "bg-white shadow font-medium" : "text-[#5A5A5A]"
    }`;

  return (
    <div className="w-64 bg-[#BAB8A2] min-h-screen p-6">

      <h2 className="text-xl font-bold mb-10">Salon Builder</h2>

      <nav className="flex flex-col gap-4">

        <Link to="/" className={linkStyle("/")}>
          <img src="/home.svg" className="w-5 h-5" />
          Dashboard
        </Link>

        <Link to="/" className={linkStyle("/")}>
          <img src="/salon.svg" className="w-5 h-5" />
          Salons
        </Link>

      </nav>
    </div>
  );
}