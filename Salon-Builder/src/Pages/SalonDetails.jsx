import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function SalonDetails() {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);

  //  FETCH DATA
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/salons/${id}/`)
      .then((res) => res.json())
      .then((data) => setSalon(data));
  }, [id]);

  //  UPDATE STATUS
  const updateStatus = async (newStatus) => {
    await fetch(`http://127.0.0.1:8000/api/salons/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setSalon({ ...salon, status: newStatus });

    toast.success(`Salon ${newStatus}`);
  };

  //  DELETE CONFIRM
  const confirmDelete = () => {
    toast(
      ({ closeToast }) => (
        <div className="text-center">
          <p className="mb-3">Are you sure?</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                handleDelete();
                closeToast();
              }}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 px-4 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  // DELETE
  const handleDelete = async () => {
    await fetch(`http://127.0.0.1:8000/api/salons/${id}/`, {
      method: "DELETE",
    });

    toast.success("Deleted");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  if (!salon) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 bg-[#F6F3EF] min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl font-semibold mb-6">Salon</h1>

      {/* TOP CARD */}
      <div className="bg-white rounded-2xl p-6 flex gap-6 items-center shadow-sm">

        {/* PREVIEW */}
        <div className="w-[320px] h-[200px] bg-[#c7a883] rounded-2xl flex items-center justify-center relative">
          <div className="w-16 h-16 bg-[#a36a00] rounded-full flex items-center justify-center text-white">
            Salon
          </div>

          <ExternalLink
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => window.open(`https://${salon.website}`, "_blank")}
          />
        </div>

        {/* INFO */}
        <div className="flex-1 space-y-3">

          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Salon Name</p>
              <h2 className="text-lg font-medium">{salon.name}</h2>
            </div>

            {/* STATUS TOGGLE */}
            <div
              onClick={() =>
                updateStatus(
                  salon.status === "Active" ? "Suspended" : "Active"
                )
              }
              className={`w-12 h-6 rounded-full cursor-pointer ${
                salon.status === "Active"
                  ? "bg-green-400"
                  : "bg-gray-300"
              }`}
            />
          </div>

          {/* DOMAIN */}
          <div>
            <p className="text-gray-400 text-sm">Domain</p>
            <div className="flex items-center gap-2">
              {salon.website}
              <ExternalLink
                size={14}
                className="cursor-pointer"
                onClick={() =>
                  window.open(`https://${salon.website}`, "_blank")
                }
              />
            </div>
          </div>

          {/* SUBSCRIPTION */}
          <p>
            <span className="text-gray-400">Subscription</span> <br />
            {salon.subscription}
          </p>

          {/* STATUS */}
          <p>
            <span className="text-gray-400">Status</span> <br />
            <span className="text-green-500">● {salon.status}</span>
          </p>

          {/* DATES */}
          <div className="flex gap-10">
            <p>
              <span className="text-gray-400">Created</span> <br />
              {salon.created}
            </p>
            <p>
              <span className="text-gray-400">Expires</span> <br />
              {salon.expires}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 bg-[#E8E1D9] p-4 rounded-2xl mt-6 text-center align-middle justify-center">

        <button
          onClick={() => updateStatus("Expired")}
          className="bg-[#BFA59A] px-6 py-2 rounded-xl text-white"
        >
          Deactivate
        </button>

        <button
          onClick={() => updateStatus("Active")}
          className="bg-[#BFA59A] px-6 py-2 rounded-xl text-white"
        >
          Renew
        </button>

        <button
          onClick={() => updateStatus("Suspended")}
          className="bg-[#C79A3B] px-6 py-2 rounded-xl text-white"
        >
          Suspend
        </button>

        <button
          onClick={confirmDelete}
          className="bg-orange-500 px-6 py-2 rounded-xl text-white flex items-center gap-2"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* CLIENT INFO */}
       <div className="bg-white p-6 rounded-2xl">
  <h2 className="text-xl font-semibold mb-6">Client Information</h2>

  <div className="space-y-5">

    {/* EMAIL */}
    <div>
      <p className="text-gray-400 text-sm">Email</p>
      <p>{salon.owner}@email.com</p>
    </div>

    {/* NAME */}
    <div className="flex gap-10">
      <div>
        <p className="text-gray-400 text-sm">First Name</p>
        <p>{salon.owner}</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Last Name</p>
        <p>-</p>
      </div>
    </div>

    {/* PAYMENT */}
    <div className="flex gap-10">
      <div>
        <p className="text-gray-400 text-sm">Payment Method</p>
        <p className="flex items-center gap-2">
          <img src="/mastercard.png" className="w-5" />
          Master Card
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Currency</p>
        <p>EGP - Egyptian Pound</p>
      </div>
    </div>

    {/* PHONE + LOCATION */}
    <div className="flex gap-10">
      <div>
        <p className="text-gray-400 text-sm">Phone</p>
        <p>+201234567891</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Location</p>
        <p>{salon.location}</p>
      </div>
    </div>

  </div>
</div>

        {/* ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Activity</h2>

          {salon.activities?.map((a) => (
            <div key={a.id} className="mb-4">
              <p className="text-green-600">● {a.title}</p>
              <p className="text-gray-500">{a.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}