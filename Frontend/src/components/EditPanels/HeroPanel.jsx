const HeroPanel = ({ draft, setDraft, onSave, onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4">

      <h2 className="font-semibold mb-4">Edit Hero</h2>

      {/* Title */}
      <input
        value={draft.title}
        onChange={(e) =>
          setDraft({
            ...draft,
            title: e.target.value,
          })
        }
        className="w-full border p-2 mb-3"
      />

      {/* Description */}
      <textarea
        value={draft.description}
        onChange={(e) =>
          setDraft({
            ...draft,
            description: e.target.value,
          })
        }
        className="w-full border p-2 mb-3"
      />

      {/* Button */}
      <input
        value={draft.button}
        onChange={(e) =>
          setDraft({
            ...draft,
            button: e.target.value,
          })
        }
        className="w-full border p-2 mb-3"
      />

      {/* Save */}
      <button
        onClick={onSave}
        className="bg-pink-500 text-white px-4 py-2 rounded w-full"
      >
        Save
      </button>

      {/* Cancel */}
      <button
        onClick={onClose}
        className="w-full mt-2 text-sm"
      >
        Cancel
      </button>

    </div>
  )
}

export default HeroPanel