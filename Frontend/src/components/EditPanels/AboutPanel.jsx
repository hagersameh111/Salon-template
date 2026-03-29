const AboutPanel = ({ draft, setDraft, onSave, onReset }) => {

  const MAX_WORDS = 100

  // handle content with word limit
  const handleContentChange = (value) => {
    const words = value.split(/\s+/).filter(w => w !== "")

    if (words.length <= MAX_WORDS) {
      setDraft({ ...draft, content: value })
    }
  }

  // current words count
  const wordCount = draft.content
    ? draft.content.split(/\s+/).filter(w => w !== "").length
    : 0

  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit About</h2>

      {/* TITLE */}
      <input
        value={draft.title}
        onChange={(e) =>
          setDraft({ ...draft, title: e.target.value })
        }
        className="w-full border p-2 mb-3"
      />

      {/* CONTENT */}
      <textarea 
        value={draft.content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="w-full border p-2 mb-1 h-[120px]"
        placeholder="Enter content..."
      />

      {/* WORD COUNTER */}
      <p className="text-xs text-gray-500 mb-3">
        {wordCount} / {MAX_WORDS} words
      </p>

      {/* IMAGE */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0]
          if (!file) return

          const reader = new FileReader()
          reader.onloadend = () => {
            setDraft({ ...draft, image: reader.result })
          }
          reader.readAsDataURL(file)
        }}
        className="w-full mb-3"
      />

      {/* POSITION X */}
      <label className="text-sm">Move Left / Right</label>
      <input
        type="range"
        min={-200}
        max={200}
        value={draft.x || 0}
        onChange={(e) =>
          setDraft({ ...draft, x: Number(e.target.value) })
        }
        className="w-full mb-3"
      />

      {/* POSITION Y */}
      <label className="text-sm">Move Up / Down</label>
      <input
        type="range"
        min={-200}
        max={200}
        value={draft.y || 0}
        onChange={(e) =>
          setDraft({ ...draft, y: Number(e.target.value) })
        }
        className="w-full mb-4"
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

export default AboutPanel