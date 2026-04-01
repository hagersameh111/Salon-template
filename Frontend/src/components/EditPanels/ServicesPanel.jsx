const ServicesPanel = ({ data, setData, onSave, onReset, onClose }) => {
  const services = data?.services || []

// ✅ UPDATE SERVICE + AUTO SORT
const updateService = (index, key, value) => {
  let updated = [...services]

  updated[index] = {
    ...updated[index],
    [key]: value,
  }

  // 🔥 AUTO FIX ORDER (no duplicates, always sorted)
  updated = updated
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item, i) => ({
      ...item,
      order: i + 1 // force unique order
    }))

  setData({
    ...data,
    services: updated,
  })
}

  // ADD NEW SERVICE
  const addService = () => {
    const newService = {
      id: Date.now(), // unique id
      category: "skincare", // default category
      title: "",
      description: "",
      price: "",
      duration: "",
      image: "",
      notes: "",
      order: services.length + 1,
      bestFor: [],
      restrictions: [],
      badge: { text: "", icon: "" }
    }

    setData({
      ...data,
      services: [...services, newService]
    })
  }

  // DELETE SERVICE
  const deleteService = (index) => {
    const updated = services.filter((_, i) => i !== index)

    setData({
      ...data,
      services: updated
    })
  }

  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit Services</h2>

      <div className="space-y-4">

        

        {/*  ADD BUTTON */}
        <button
          onClick={addService}
          className="w-full bg-black text-white py-2 rounded mb-4"
        >
          + Add Service
        </button>

        {services.map((service, index) => (
          <div key={service.id || index} className="border p-3 rounded">

            {/* ✅ ORDER INPUT */}
<input
  type="number"
  value={service.order || index + 1}
  onChange={(e) =>
    updateService(index, "order", Number(e.target.value))
  }
  className="w-full border p-2 mb-2"
  placeholder="Order"
/>
            {/* CATEGORY SELECTOR */}
            <select
              value={service.category || "skincare"}
              onChange={(e) =>
                updateService(index, "category", e.target.value)
              }
              className="w-full border p-2 mb-2"
            >
              <option value="skincare">SkinCare</option>
              <option value="waxing">Waxing</option>
            </select>

            {/* TITLE */}
            <input
              value={service.title || ""}
              onChange={(e) =>
                updateService(index, "title", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Title"
            />

            {/* PRICE */}
            <input
              value={service.price || ""}
              onChange={(e) =>
                updateService(index, "price", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Price"
            />

            {/* DESCRIPTION */}
            <textarea
              value={service.description || ""}
              onChange={(e) =>
                updateService(index, "description", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Description"
            />

            {/* NOTES (VISIBLE IN CARD) */}
            <textarea
              value={service.notes || ""}
              onChange={(e) =>
                updateService(index, "notes", e.target.value)
              }
              className="w-full border p-2 mb-2 text-sm"
              placeholder="Notes (shown in service card)..."
            />

            {/* IMAGE PREVIEW */}
            <img
              src={service.image || "/placeholder.jpg"}
              className="w-full h-24 object-cover rounded mt-2 mb-2"
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]
                if (!file) return

                const reader = new FileReader()

                reader.onloadend = () => {
                  updateService(index, "image", reader.result)
                }

                reader.readAsDataURL(file)
              }}
              className="w-full text-xs"
            />

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteService(index)}
              className="text-red-500 text-xs mt-2"
            >
              Delete Service
            </button>

          </div>
        ))}

      </div>

      {/* SAVE */}
      <button
        onClick={onSave}
        className="bg-pink-500 text-white w-full py-2 rounded mt-4 mb-2"
      >
        Save
      </button>

      {/* RESET */}
      <button
        onClick={onReset}
        className="bg-gray-300 w-full py-2 rounded mb-2"
      >
        Reset
      </button>

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="bg-gray-200 w-full py-2 rounded"
      >
        Close
      </button>

    </div>
  )
}

export default ServicesPanel