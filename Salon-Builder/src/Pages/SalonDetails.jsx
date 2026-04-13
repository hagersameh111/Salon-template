import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  getSalon,
  activateSalon,
  suspendSalon,
  deactivateSalon,
  deleteSalon,
  renewSalon,
} from "../api/salons";

export default function SalonDetails() {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);

  const fetchSalon = async () => {
    const data = await getSalon(id);
    setSalon(data);
  };

  useEffect(() => {
    fetchSalon();
  }, [id]);

  // ✅ TOGGLE ACTIVE / SUSPEND
  const toggleSuspend = async () => {
    if (salon.status === "Active") {
      await suspendSalon(id);
    } else {
      await activateSalon(id);
    }
    fetchSalon();
  };

  // ✅ DEACTIVATE CONFIRMATION
  const confirmDeactivate = () => {
    toast(({ closeToast }) => (
      <div className="text-center">
        <p className="mb-3">
          Are you sure? It will be permanently deleted after 30 days if no action is taken.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={async () => {
              await deactivateSalon(id);
              closeToast();
              fetchSalon();
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
    ), { autoClose: false });
  };

  // ✅ DELETE CONFIRM
  const confirmDelete = () => {
    toast(({ closeToast }) => (
      <div className="text-center">
        <p className="mb-3">Are you sure?</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={async () => {
              await deleteSalon(id);
              closeToast();
              fetchSalon();
            }}
            className="bg-orange-500 text-white px-4 py-1 rounded"
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
    ), { autoClose: false });
  };

  // ✅ RENEW POPUP
  const openRenewPopup = () => {
    toast(({ closeToast }) => (
      <div className="text-center">
        <p className="mb-3">Select renewal plan</p>

        <div className="flex gap-2 justify-center">
          {["3M", "6M", "9M", "12M"].map((plan) => (
            <button
              key={plan}
              onClick={async () => {
                await renewSalon(id, plan);
                closeToast();
                fetchSalon();
              }}
              className="bg-[#C79A3B] text-white px-3 py-1 rounded"
            >
              {plan}
            </button>
          ))}
        </div>
      </div>
    ), { autoClose: false });
  };

  if (!salon) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 bg-[#F6F3EF] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">Salon</h1>

      {/* TOP CARD */}
      <div className="bg-white rounded-2xl p-6 flex gap-6 items-center">

        {/* PREVIEW */}
        <div className="w-[320px] h-[200px] bg-[#c7a883] rounded-2xl flex items-center justify-center relative">
          <div className="w-16 h-16 bg-[#a36a00] rounded-full flex items-center justify-center text-white">
            Salon
          </div>

          <ExternalLink
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() =>
              window.open(`https://${salon.website}`, "_blank")
            }
          />
        </div>

        {/* INFO */}
        <div className="flex-1 space-y-4">

          {/* NAME + TOGGLE */}
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Salon Name</p>
              <p>{salon.name}</p>
            </div>

            {/* ✅ SWITCH FIXED */}
            <div
              onClick={toggleSuspend}
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
            <div className="flex gap-2 items-center">
              {salon.website}
              <ExternalLink
                size={14}
                onClick={() =>
                  window.open(`https://${salon.website}`, "_blank")
                }
              />
            </div>
          </div>

          {/* SUBSCRIPTION */}
          <div>
            <p className="text-gray-400 text-sm">Subscription</p>
            <p>{salon.subscription}</p>
          </div>

          {/* STATUS */}
          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-green-500">● {salon.status}</p>
          </div>

          {/* DATES */}
          <div className="flex gap-10">
            <div>
              <p className="text-gray-400 text-sm">Created</p>
              <p>{salon.created}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Expires</p>
              <p>{salon.expires}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex bg-[#E8E1D9] p-4 rounded-2xl mt-6 justify-center gap-8">

        {/* ✅ DEACTIVATE WITH POPUP */}
        <button
          onClick={confirmDeactivate}
          className="bg-[#BFA59A] px-6 py-2 rounded-xl text-white"
        >
          Deactivate
        </button>

        {/* ✅ RENEW */}
        <button
          onClick={openRenewPopup}
          className="bg-[#BFA59A] px-6 py-2 rounded-xl text-white"
        >
          Renew
        </button>

        {/* ✅ TOGGLE BUTTON */}
        <button
          onClick={toggleSuspend}
          className={`px-6 py-2 rounded-xl text-white ${
            salon.status === "Active"
              ? "bg-[#C79A3B]"
              : "bg-green-500"
          }`}
        >
          {salon.status === "Active" ? "Suspend" : "Activate"}
        </button>

        {/* DELETE */}
        <button
          onClick={confirmDelete}
          className="bg-orange-500 px-6 py-2 rounded-xl text-white flex gap-2"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      {/* CLIENT */}
      <div className="grid grid-cols-2 gap-6 mt-6">

        <div className="bg-white p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-6">Client Information</h2>

          {salon.client ? (
            <div className="space-y-5">
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p>{salon.client.email}</p>
              </div>

              <div className="flex gap-10">
                <div>
                  <p className="text-gray-400 text-sm">First Name</p>
                  <p>{salon.client.first_name}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Last Name</p>
                  <p>{salon.client.last_name}</p>
                </div>
              </div>

              <div className="flex gap-10">
                <div>
                  <p className="text-gray-400 text-sm">Payment Method</p>
                  <p>{salon.client.payment_method}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Currency</p>
                  <p>{salon.client.currency}</p>
                </div>
              </div>

              <div className="flex gap-10">
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p>{salon.client.phone}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p>{salon.client.location}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>No client data</p>
          )}
        </div>

        {/* ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Activity</h2>

          {salon.activities?.length > 0 ? (
            salon.activities.map((a) => (
              <div key={a.id} className="mb-4">
                <p className="text-green-600">● {a.title}</p>
                <p className="text-gray-500">{a.date}</p>
              </div>
            ))
          ) : (
            <p>No activity yet</p>
          )}
        </div>

      </div>
    </div>
  );
}