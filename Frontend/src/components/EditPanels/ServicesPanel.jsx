const ServicesPanel = ({ data, setData, onSave, onReset, onClose }) => {
  const services = data?.services || []

  const updateService = (index, key, value) => {
    const updated = [...services]
    updated[index] = {
      ...updated[index],
      [key]: value,
    }

    setData({
      ...data,
      services: updated,
    })
  }

  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit Services</h2>

      <div className="space-y-4">

        {services.map((service, index) => (
          <div key={service.id || index} className="border p-3 rounded">

            <input
              value={service.title || ""}
              onChange={(e) =>
                updateService(index, "title", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Title"
            />

            <input
              value={service.price || ""}
              onChange={(e) =>
                updateService(index, "price", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Price"
            />

            <textarea
              value={service.description || ""}
              onChange={(e) =>
                updateService(index, "description", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Description"
            />

            <textarea
              value={service.notes || ""}
              onChange={(e) =>
                updateService(index, "notes", e.target.value)
              }
              className="w-full border p-2 mb-2 text-sm"
              placeholder="Internal notes..."
            />

            <img
              src={service.image || "/placeholder.jpg"}
              className="w-full h-24 object-cover rounded mt-2 mb-2"
            />

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

export default ServicesPanel