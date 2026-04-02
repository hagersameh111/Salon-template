const AddonsPanel = ({ data, setData, onSave, onReset, onClose }) => {
  const items = data?.items || []

  const updateItem = (index, key, value) => {
    const updated = [...items]
    updated[index] = {
      ...updated[index],
      [key]: value
    }

    setData({
      ...data,
      items: updated
    })
  }

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      title: "",
      description: "",
      duration: "",
      price: ""
    }

    setData({
      ...data,
      items: [...items, newItem]
    })
  }

  const deleteItem = (index) => {
    const updated = items.filter((_, i) => i !== index)

    setData({
      ...data,
      items: updated
    })
  }

  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit Add-ons</h2>

      <button
        onClick={addItem}
        className="w-full bg-black text-white py-2 rounded mb-4"
      >
        + Add Add-on
      </button>

      <div className="space-y-4">

        {/* ✅ BACKGROUND IMAGE PREVIEW */}
<img
  src={data.backgroundImage || "/placeholder.jpg"}
  className="w-full h-32 object-cover rounded mb-2"
/>

{/* ✅ BACKGROUND IMAGE UPLOAD */}
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setData({
        ...data,
        backgroundImage: reader.result
      })
    }

    reader.readAsDataURL(file)
  }}
  className="w-full text-xs mb-4"
/>

        {items.map((item, index) => (
          <div key={item.id} className="border p-3 rounded">

            <input
              value={item.title || ""}
              onChange={(e) =>
                updateItem(index, "title", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Title"
            />

            <textarea
              value={item.description || ""}
              onChange={(e) =>
                updateItem(index, "description", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Description"
            />

            <input
              value={item.duration || ""}
              onChange={(e) =>
                updateItem(index, "duration", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Duration"
            />

            <input
              value={item.price || ""}
              onChange={(e) =>
                updateItem(index, "price", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Price"
            />

            <button
              onClick={() => deleteItem(index)}
              className="text-red-500 text-xs"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

      <button
        onClick={onSave}
        className="bg-pink-500 text-white w-full py-2 rounded mt-4 mb-2"
      >
        Save
      </button>

      <button
        onClick={onReset}
        className="bg-gray-300 w-full py-2 rounded mb-2"
      >
        Reset
      </button>

      <button
        onClick={onClose}
        className="bg-gray-200 w-full py-2 rounded"
      >
        Close
      </button>

    </div>
  )
}

export default AddonsPanel