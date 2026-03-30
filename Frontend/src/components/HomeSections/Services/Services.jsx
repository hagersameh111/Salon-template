import { useState } from "react"
import Container from "../../ui/Container"
import { brand } from "../../../config/brand"
import ServiceCard from "./ServiceCard"
import { useTranslation } from "react-i18next"

const Services = ({ data, editMode, onEdit }) => {
    const { t } = useTranslation()

  // ✅ dynamic categories with fallback
const categories = data?.categories || [
  { id: "skincare", name: "SkinCare" },
  { id: "waxing", name: "Waxing" }
]

const [activeTab, setActiveTab] = useState(categories[0]?.id || "")

// ✅ NEW: support dynamic data with fallback to brand
  const services = data?.services || brand.data.services

  const filteredServices = services.filter(
    (service) => service.category === activeTab
  )

  return (
    <section className="relative pt-2 pb-8 overflow-hidden bg-[var(--color-bg-soft)]">
{editMode && (
  <button
    onClick={() => onEdit("services")}
    className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-20"
  >
    ✏ Edit
  </button>
)}
      {/* GRADIENT */}
      <div
        className="
          absolute
          left-1/2
          bottom-[-250px] sm:bottom-[-300px] lg:bottom-[-350px]
          -translate-x-1/2
          w-[1200px] sm:w-[1600px] lg:w-[2200px]
          h-[600px] sm:h-[750px] lg:h-[900px]
          rounded-full
          pointer-events-none
        "
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(232,174,183,0.35) 0%,
              rgba(232,174,183,0.25) 30%,
              rgba(232,174,183,0.15) 50%,
              rgba(232,174,183,0.08) 65%,
              rgba(232,174,183,0.04) 75%,
              rgba(232,174,183,0.02) 85%,
              transparent 95%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <Container>

          {/* TITLE + TABS */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10 sm:mb-12 lg:mb-16">

            <h2 className="text-[26px] lg:text-[56px] text-[var(--color-primary-soft)] font-semibold text-center lg:text-left">
              {t("servicesTabs.title")}
            </h2>

            <div className="flex justify-center lg:justify-end gap-3 sm:gap-6 flex-wrap">

              {categories.map((cat) => (
  <button
    key={cat.id}
    onClick={() => setActiveTab(cat.id)}
    className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-[19px] font-medium transition text-[12px] sm:text-base ${
      activeTab === cat.id
        ? "bg-[var(--color-primary-soft)] text-white"
        : "text-gray-500"
    }`}
  >
    {t(`servicesTabs.${cat.id}`) || cat.name}
  </button>
))}


            </div>
          </div>

          {/* CARDS */}
          <div key={activeTab} className="animate-fadeIn">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

        </Container>
      </div>
    </section>
  )
}

export default Services
