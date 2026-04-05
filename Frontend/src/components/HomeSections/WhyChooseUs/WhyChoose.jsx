import Section from "../../ui/Section"
import Container from "../../ui/Container"
import SectionTitle from "../../ui/SectionTitle"
import { brand } from "../../../config/brand"
import { useTranslation } from "react-i18next"
import "./whychoose-responsive.css"

const WhyChoose = ({ editMode, data, onEdit }) => {

  const { i18n } = useTranslation()
  const isRTL = i18n.language === "ar"
  const whyChooseImage = data.image

  return (

    <Section className="relative bg-[var(--color-bg-soft)] pt-2 pb-2">
      {/* ✅ FIX 1: moved Edit button inside return */}
      {editMode && (
        <button
          onClick={() => onEdit("whyChoose")}
          className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-20"
        >
          ✏ Edit
        </button>
      )}

      <Container>

        <div className={`grid whychoose-layout grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-24 items-start ${isRTL ? "lg:[&>*:first-child]:order-2" : ""}`}>

          {/* IMAGE */}
          <div className="space-y-8 whychoose-images">
            {[0,1,2].map((index) => (
              <div
                key={index}
                className="rounded-[28px] overflow-hidden h-[200px] whychoose-img"
              >
                <img
                  src={whyChooseImage}
                  alt=""
                  className="w-full object-cover whychoose-slice"
                />
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <div className={`whychoose-content pl-3 ${isRTL ? "text-start" : ""}`}>

            {/* ✅ FIX 2: use data instead of t() */}
            <SectionTitle
              title={data.title}
              subtitle={data.subtitle}
              align={isRTL ? "right" : "left"}
              size="large"
              className="sm:mb-2 lg:mb-4 [&_h2]:text-[var(--color-secondary)] [&_p:last-child]:mt-1 lg:[&_p:last-child]:mt-6"
            />

            <div className="space-y-4 lg:space-y-8 whychoose-features sm:mt-[-8px] sm:pt-[-8px]">

              {data.features.map((item) => (

                <div key={item.id} className="flex gap-2 items-start whychoose-feature">

                  {/* لسه بنستخدم icon من brand (مظبوط) */}
                  <img
                    src="/heart-icon.svg"
                    className="w-6 h-6 lg:w-8 lg:h-8 mt-1 shrink-0 whychoose-icon"
                    alt=""
                  />

                  <div>
                    {/* ✅ FIX 3: remove t() */}
                    <h3 className="text-[18px] lg:text-2xl font-semibold mb-1 lg:mb-2 leading-snug lg:leading-normal">
                      {item.title}
                    </h3>

                    <p className="text-[12px] lg:text-lg text-[var(--color-text-main)] leading-tight lg:leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </Container>

    </Section>

  )

}

export default WhyChoose