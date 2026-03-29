const Footer = ({ editMode, data, onEdit }) => {
  return (
    <footer className="bg-[var(--color-footer-bg)] pt-1 pb-6 md:pt-1 md:pb-1 text-center border-t border-[var(--color-primary)] relative">

      {/* ================= EDIT BUTTON ================= */}
      {editMode && (
        <button
          onClick={() => onEdit("footer")}
          className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-20"
        >
          ✏ Edit
        </button>
      )}

      <div className="max-w-screen-md mx-auto flex flex-col items-center">

        {/* ================= BRAND NAME ================= */}
        <h2 className="text-[28px] tracking-[0.4em] text-[var(--color-footer-title)] font-light">
          {data.name}
        </h2>

        {/* ================= SUB NAME ================= */}
        <p className="text-xs tracking-[0.5em] text-[var(--color-footer-title)] mt-1">
          {data.subName}
        </p>

        {/* ================= LOGO ================= */}
        <img
          src={data.logo}
          alt={data.name}
          className="h-18 mt-1"
        />

        {/* ================= SLOGAN ================= */}
        <p className="mt-1 text-sm text-[var(--color-footer-title)]">
          {data.slogan}
        </p>

        {/* ================= COPYRIGHT ================= */}
        <p className="mt-4 text-xs text-[var(--color-footer-copyright)]">
          {data.copyright}
        </p>

      </div>

    </footer>
  )
}

export default Footer

