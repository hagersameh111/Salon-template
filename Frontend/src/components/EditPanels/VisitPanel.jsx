const VisitPanel = ({ draft, setDraft, onSave, onReset }) => {

  // ================= HANDLERS =================

  const updateField = (key, value) => {
    setDraft({ ...draft, [key]: value })
  }

  const updateHour = (index, field, value) => {
    const updated = [...draft.hours]
    updated[index][field] = value

    setDraft({ ...draft, hours: updated })
  }

  const addHour = () => {
    setDraft({
      ...draft,
      hours: [...draft.hours, { day: "New Day", time: "00:00 - 00:00" }]
    })
  }

  const deleteHour = (index) => {
    const updated = draft.hours.filter((_, i) => i !== index)
    setDraft({ ...draft, hours: updated })
  }

  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit Visit Section</h2>

      {/* TITLE */}
      <input
        value={draft.title}
        onChange={(e) => updateField("title", e.target.value)}
        className="w-full border p-2 mb-3"
        placeholder="Title"
      />

      {/* ADDRESS */}
      <textarea
        value={draft.address}
        onChange={(e) => updateField("address", e.target.value)}
        className="w-full border p-2 mb-3"
        placeholder="Address"
      />

      {/* MAP URL */}
      <input
        value={draft.mapUrl}
        onChange={(e) => updateField("mapUrl", e.target.value)}
        className="w-full border p-2 mb-3"
        placeholder="Google Map Embed URL"
      />

      {/* ================= WORKING HOURS ================= */}
      <p className="text-sm font-semibold mb-2">Working Hours</p>

      {draft.hours.map((item, index) => (
        <div key={index} className="mb-3 border-b pb-2">

          <input
            value={item.day}
            onChange={(e) => updateHour(index, "day", e.target.value)}
            className="w-full border p-2 mb-1"
            placeholder="Day"
          />

          <input
            value={item.time}
            onChange={(e) => updateHour(index, "time", e.target.value)}
            className="w-full border p-2 mb-1"
            placeholder="Time"
          />

          <button
            onClick={() => deleteHour(index)}
            className="text-red-500 text-xs"
          >
            Delete
          </button>

        </div>
      ))}

      <button
        onClick={addHour}
        className="w-full bg-gray-200 py-2 rounded mb-3"
      >
        + Add Day
      </button>

      {/* ================= CONTACTS ================= */}

      <input
        value={draft.email}
        onChange={(e) => updateField("email", e.target.value)}
        className="w-full border p-2 mb-3"
        placeholder="Email"
      />

      <input
        value={draft.instagram}
        onChange={(e) => updateField("instagram", e.target.value)}
        className="w-full border p-2 mb-3"
        placeholder="Instagram"
      />

      <input
        value={draft.whatsapp}
        onChange={(e) => updateField("whatsapp", e.target.value)}
        className="w-full border p-2 mb-3"
        placeholder="WhatsApp"
      />

      {/* BUTTON */}
      <input
        value={draft.buttonText}
        onChange={(e) => updateField("buttonText", e.target.value)}
        className="w-full border p-2 mb-2"
        placeholder="Button Text"
      />

      <input
        value={draft.buttonUrl}
        onChange={(e) => updateField("buttonUrl", e.target.value)}
        className="w-full border p-2 mb-4"
        placeholder="Button URL"
      />

      {/* SAVE */}
      <button
        onClick={onSave}
        className="bg-pink-500 text-white w-full py-2 rounded mb-2"
      >
        Save
      </button>

      {/* RESET */}
      <button
        onClick={onReset}
        className="bg-gray-300 w-full py-2 rounded"
      >
        Reset
      </button>

    </div>
  )
}

export default VisitPanel