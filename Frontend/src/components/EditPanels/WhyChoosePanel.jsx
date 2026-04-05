const WhyChoosePanel = ({
  draft,
  setDraft,
  onSave,
  onReset,
  templates,
}) => {
  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto pb-20">

      <h2 className="font-semibold mb-4">Edit Why Choose</h2>

      {/* Title */}
      <input
        value={draft.title}
        onChange={(e) =>
          setDraft({ ...draft, title: e.target.value })
        }
        className="w-full border p-2 mb-3"
      />

      {/* Subtitle */}
      <textarea
        value={draft.subtitle}
        onChange={(e) =>
          setDraft({ ...draft, subtitle: e.target.value })
        }
        className="w-full border p-2 mb-3"
      />

      {/* Features */}
      {draft.features.map((item, index) => (
        <div key={index} className="mb-4 border-t pt-3">

          <p className="text-sm mb-1">Feature {index + 1}</p>

          <input
            value={item.title}
            onChange={(e) => {
              const updated = [...draft.features]
              updated[index].title = e.target.value

              setDraft({
                ...draft,
                features: updated,
              })
            }}
            className="w-full border p-2 mb-2"
          />

          <textarea
            value={item.desc}
            onChange={(e) => {
              const updated = [...draft.features]
              updated[index].desc = e.target.value

              setDraft({
                ...draft,
                features: updated,
              })
            }}
            className="w-full border p-2"
          />

          <button
            onClick={() => {
              const updated = draft.features.filter((_, i) => i !== index)

              setDraft({
                ...draft,
                features: updated,
              })
            }}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm mt-2"
          >
            Delete
          </button>

        </div>
      ))}

      {/* Add Feature */}
      <button
        onClick={() => {
          if (draft.features.length >= 5) return

          setDraft({
            ...draft,
            features: [
              ...draft.features,
              {
                id: Date.now(),
                title: "New Feature",
                desc: "Description...",
              },
            ],
          })
        }}
        className="px-3 py-2 rounded w-full mb-3 bg-gray-200"
      >
        + Add Feature
      </button>

      {/* Templates */}
      <div className="mb-3">
        <p className="text-sm mb-2">Choose Template</p>

        <div className="flex gap-2">
          {templates.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() =>
                setDraft({
                  ...draft,
                  image: img,
                })
              }
              className="w-16 h-16 object-cover rounded cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0]
          if (!file) return

          const reader = new FileReader()

          reader.onloadend = () => {
            setDraft({
              ...draft,
              image: reader.result,
            })
          }

          reader.readAsDataURL(file)
        }}
        className="w-full mb-3"
      />

      {/* Save */}
      <button
        onClick={onSave}
        className="bg-pink-500 text-white px-4 py-2 rounded w-full mb-2"
      >
        Save
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        className="bg-gray-300 text-black px-4 py-2 rounded w-full"
      >
        Reset
      </button>

    </div>
  )
}

export default WhyChoosePanel