const FooterPanel = ({ draft, setDraft, onSave, onReset }) => {
  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit Footer</h2>

      {/* NAME */}
      <input
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        className="w-full border p-2 mb-3"
        placeholder="Brand Name"
      />

      {/* SUB NAME */}
      <input
        value={draft.subName}
        onChange={(e) => setDraft({ ...draft, subName: e.target.value })}
        className="w-full border p-2 mb-3"
        placeholder="Sub Name"
      />

      {/* SLOGAN */}
      <input
        value={draft.slogan}
        onChange={(e) => setDraft({ ...draft, slogan: e.target.value })}
        className="w-full border p-2 mb-3"
        placeholder="Slogan"
      />

      {/* COPYRIGHT */}
      <input
        value={draft.copyright}
        onChange={(e) => setDraft({ ...draft, copyright: e.target.value })}
        className="w-full border p-2 mb-3"
        placeholder="Copyright"
      />

      {/* LOGO */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0]
          if (!file) return

          const reader = new FileReader()
          reader.onloadend = () => {
            setDraft({ ...draft, logo: reader.result })
          }
          reader.readAsDataURL(file)
        }}
        className="w-full mb-3"
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

export default FooterPanel