import { Link, useSearchParams } from "react-router-dom";
import {
  Menu,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SalonOverview() {
  const [params, setParams] = useSearchParams();

  const [salons, setSalons] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const status = params.get("status") || "All";
  const plan = params.get("plan") || "All";

  // ✅ UPDATE FILTER
  const updateFilter = (key, value) => {
    params.set(key, value === "All" ? "" : value);
    setParams(params);
    setPage(1); // reset page when filter changes
  };

  // ✅ BUILD URL
  const buildUrl = () => {
    let url = `http://127.0.0.1:8000/api/salons/?page=${page}&`;

    if (status !== "All") url += `status=${status}&`;
    if (plan !== "All") url += `subscription=${plan}&`;
    if (search) url += `search=${search}&`;

    return url;
  };

  // ✅ FETCH DATA
  useEffect(() => {
    fetch(buildUrl())
      .then((res) => res.json())
      .then((data) => {
        setSalons(data.results);
        setCount(data.count);
      });
  }, [status, plan, page, search]);

  return (
    <div className="min-h-screen bg-[#F6F3EF] px-10 py-6 text-[#3F3F3F]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Menu size={22} className="text-[#6B6B6B]" />
          <h1 className="text-[28px] font-semibold">Salons Overview</h1>
        </div>

        {/* SEARCH */}
        <div className="flex items-center bg-white px-5 py-2 rounded-full shadow w-[260px]">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="ml-2 w-full outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-6 mb-10 flex-wrap">

        {/* STATUS */}
        <div className="flex items-center gap-3 bg-[#E8E1D9] px-5 py-2 rounded-full">
          <span>Status:</span>

          {["All", "Active", "Expired", "Trial"].map((item) => (
            <button
              key={item}
              onClick={() => updateFilter("status", item)}
              className={`px-4 py-[6px] rounded-full text-sm shadow-sm ${
                status === item ? "bg-white" : "text-[#6B6B6B]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* PLANS */}
        <div className="flex items-center gap-3 bg-[#E8E1D9] px-5 py-2 rounded-full">
          <span>Plans:</span>

          {["All", "3M", "6M", "9M", "12M"].map((item) => (
            <button
              key={item}
              onClick={() => updateFilter("plan", item)}
              className={`px-4 py-[6px] rounded-full text-sm shadow-sm ${
                plan === item ? "bg-white" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-[#E5DED6] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#E8E1D9]">
            <tr>
              <th className="px-6 py-4 text-left">Salon</th>
              <th className="px-6 py-4 text-left">Website</th>
              <th className="px-6 py-4 text-left">Owner Name</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Renewal Date</th>
              <th className="px-6 py-4 text-left">Subscription</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {salons.map((s) => (
              <tr key={s.id} className="border-t hover:bg-[#FAF8F5]">
                <td className="px-6 py-4">{s.name}</td>

                <td className="px-6 py-4 underline cursor-pointer">
                  {s.website}
                </td>

                <td className="px-6 py-4">{s.owner}</td>
                <td className="px-6 py-4">{s.location}</td>

                <td className="px-6 py-4">{s.renewal_date}</td>

                <td className="px-6 py-4">{s.subscription}</td>

                <td className="px-6 py-4">
                  <span className="bg-[#AFA77A] text-white px-4 py-[6px] rounded-full text-xs">
                    {s.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link to={`/salon/${s.id}`}>
                    <ArrowRight className="text-[#6B6B6B]" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="h-[200px]" />
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="w-9 h-9 bg-white rounded-full border flex items-center justify-center"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-sm">
          Page {page} • {count} total
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="w-9 h-9 bg-white rounded-full border flex items-center justify-center"
        >
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
}