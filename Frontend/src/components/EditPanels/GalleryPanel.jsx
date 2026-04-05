const GalleryPanel = ({ draft, setDraft, onSave, onReset }) => {
  const MAX_IMAGES = 10

  // ✅ fallback protection (prevents crash)
  const images = draft?.images || []

  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit Gallery</h2>

      {/* INSTAGRAM URL */}
      <input
        value={draft?.instagramUrl || ""}
        onChange={(e) =>
          setDraft({
            ...draft,
            instagramUrl: e.target.value,
          })
        }
        placeholder="Instagram URL"
        className="w-full border p-2 mb-3"
      />

      {/* IMAGES */}
      {images.map((item, index) => (
        <div key={index} className="mb-4 border-b pb-3">

          {/* Preview */}
          <img
            src={item?.media_url || "/placeholder.jpg"}
            className="w-full h-32 object-cover rounded mb-2"
          />

          {/* Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0]
              if (!file) return

              const reader = new FileReader()

              reader.onloadend = () => {
                const updated = [...images]
                updated[index] = {
                  ...updated[index],
                  media_url: reader.result,
                }

                setDraft({
                  ...draft,
                  images: updated,
                })
              }

              reader.readAsDataURL(file)
            }}
            className="w-full"
          />

          {/* Delete */}
          <button
            onClick={() => {
              const updated = images.filter((_, i) => i !== index)

              setDraft({
                ...draft,
                images: updated,
              })
            }}
            className="text-red-500 text-sm mt-1"
          >
            Delete
          </button>

        </div>
      ))}

      {/* ADD IMAGE */}
      <button
        onClick={() => {
          if (images.length >= MAX_IMAGES) return

          setDraft({
            ...draft,
            images: [
              ...images,
              { media_url: "/placeholder.jpg", caption: "" },
            ],
          })
        }}
        disabled={images.length >= MAX_IMAGES}
        className={`w-full py-2 rounded mb-3 ${
          images.length >= MAX_IMAGES
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-200"
        }`}
      >
        + Add Image
      </button>

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

export default GalleryPanel