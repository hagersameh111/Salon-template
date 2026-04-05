import Container from "../../ui/Container"
import { useTranslation } from "react-i18next"

const AddOnsSection = ({ data, editMode, onEdit }) => {
  const { t } = useTranslation()
  const addonsData = data

  return (
    <section className="relative w-full">

      {editMode && (
  <button
    onClick={() => onEdit("addons")}
    className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-20"
  >
    ✏ Edit
  </button>
)}

      {/* BACKGROUND */}
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${data?.backgroundImage || "/spa.jpg"})`
  }}
/>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 py-16 sm:py-20 lg:py-24">
        <Container>

          <h2 className="text-center text-[16px] lg:text-[40px] font-semibold text-[var(--color-secondary)] mb-10 sm:mb-12 lg:mb-14">
            {t("addons.title")}
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 justify-center items-stretch">

            {addonsData.items.map((item) => {

      // USE DIRECT DATA (no translation)
      const title = item.title || ""
      const desc = item.description || ""
      const duration = item.duration || ""
      const price = item.price || ""

              return (
                <div
                  key={item.id}
                  className="backdrop-blur-xl bg-white/35 border border-white/30 rounded-[30px] lg:rounded-[40px] p-6 sm:p-8 lg:p-10 w-full max-w-[520px] text-white"
                >

                  <h4 className="text-[16px] lg:text-2xl font-semibold mb-4 sm:mb-6 text-[var(--color-secondary)]">
                    {title}
                  </h4>

                  <p className="text-white/80 mb-6 sm:mb-8 leading-relaxed text-[12px] lg:text-base">
                    {desc}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <span className="text-white/80 text-[12px] lg:text-base">
                      {duration} •{" "}
                      <span className="text-[var(--color-secondary)]">
                        {price}
                      </span>
                    </span>

                    <a
                      href="https://visibook.com/soraaesthetics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 px-5 sm:px-6 py-2 rounded-full hover:bg-white/30 transition text-[var(--color-secondary)] text-[12px] lg:text-base inline-flex items-center justify-center"
                    >
                      {t("addons.button")}
                    </a>

                  </div>

                </div>
              )
            })}

          </div>

        </Container>
      </div>
    </section>
  )
}

export default AddOnsSection
