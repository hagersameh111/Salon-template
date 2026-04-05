import Section from "../../ui/Section"
import Container from "../../ui/Container"
import { brand } from "../../../config/brand"
import { useTranslation } from "react-i18next"

const AboutSection = ({ editMode, data, onEdit }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "ar"

  const paragraphs = data.content
  ?.split("\n")
  .filter(p => p.trim() !== "") || []

  return (
    <Section className="bg-white overflow-hidden relative">

      {/* EDIT BUTTON */}
      {editMode && (
        <button
          onClick={() => onEdit("about")}
          className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-20"
        >
          ✏ Edit
        </button>
      )}

      <Container>

        <div
          className={`relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 ${
            isRTL ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >

          {/* IMAGE */}
          <div className="relative h-[300px] sm:h-[320px] md:h-[420px] lg:h-[650px]">
            <img
              src={data.image}
              alt=""
              className="w-full h-full object-cover rounded-[18px] sm:rounded-[24px]"
            />
          </div>

          {/* CONTENT CARD */}
          <div
            className="relative bg-white p-6 sm:p-10 md:p-14 lg:p-10 shadow-lg rounded-[20px] sm:rounded-[24px] z-10 overflow-hidden"
            style={{
               transform: `translate(${data.x || 0}px, ${data.y || 0}px)`
            }}
          >

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-medium text-[var(--color-primary-soft)] leading-tight mb-6 sm:mb-8 lg:mb-10">
              {data.title}
            </h2>

            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
              {paragraphs.map((text, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[var(--color-text-main)] leading-relaxed break-words"
                  style={{ wordBreak: "break-word" }}
                >
                  {text}
                </p>
              ))}
            </div>

          </div>

        </div>

      </Container>
    </Section>
  )
}

export default AboutSection
