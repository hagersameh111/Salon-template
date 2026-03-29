import Section from "../../ui/Section"
import Container from "../../ui/Container"
import { brand } from "../../../config/brand"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const VisitSection = ({ editMode, data, onEdit }) => {
  const mapRef = useRef(null)
  const [loadMap, setLoadMap] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMap(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (mapRef.current) observer.observe(mapRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Section className="bg-[#F6F6F6] pl-3 pt-8 pb-12 relative">

      {/* EDIT */}
      {editMode && (
        <button
          onClick={() => onEdit("visit")}
          className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-20"
        >
          ✏ Edit
        </button>
      )}

      <Container>

        {/* TITLE */}
        <div className="mb-6">
          <h2 className="text-3xl lg:text-[48px] font-semibold text-[var(--color-primary-soft)] mb-4">
            {data.title}
          </h2>

          <div className="w-full max-w-[420px] h-[1px] bg-[var(--color-primary-soft)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

          {/* LEFT */}
          <div>

            {/* LOCATION */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <img src="/location.svg" className="w-5 h-5" />
                <h4 className="text-xl font-bold text-[var(--color-primary)]">
                  {data.locationLabel}
                </h4>
              </div>

              <p className="text-sm leading-relaxed whitespace-pre-line">
                {data.address}
              </p>
            </div>

            {/* MAP */}
            <div
              ref={mapRef}
              className="w-full h-[300px] rounded-[24px] overflow-hidden"
            >
              {loadMap ? (
<iframe
  src={`https://www.google.com/maps?q=${encodeURIComponent(data.address)}&output=embed`}
  className="w-full h-full border-0"
  loading="lazy"
/>
              ) : (
                <img src={data.mapImage} className="w-full h-full object-cover" />
              )}
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">

            {/* WORKING HOURS */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src="/calendar.svg" className="w-5 h-5" />
                <h4 className="text-xl font-bold text-[var(--color-primary)]">
                  {data.hoursLabel}
                </h4>
              </div>

              {data.hours.map((item, i) => (
                <p key={i} className="text-sm">
                  <strong>{item.day}</strong>: {item.time}
                </p>
              ))}
            </div>

            {/* EMAIL */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src="/mail.svg" className="w-5 h-5" />
                <h4 className="text-xl font-bold text-[var(--color-primary)]">
                  {data.emailLabel}
                </h4>
              </div>

              <a href={`mailto:${data.email}`} className="text-sm underline">
  {data.email}
</a>
            </div>

            {/* INSTAGRAM */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src="/instagram.svg" className="w-5 h-5" />
                <h4 className="text-xl font-bold text-[var(--color-primary)]">
                  Instagram
                </h4>
              </div>

              <a
  href={`https://instagram.com/${data.instagram.replace("@", "")}`}
  target="_blank"
  className="text-sm underline"
>
  {data.instagram}
</a>
            </div>

            {/* WHATSAPP */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src="/whatsapp.svg" className="w-5 h-5" />
                <h4 className="text-xl font-bold text-[var(--color-primary)]">
                  WhatsApp
                </h4>
              </div>

              <a
  href={`https://wa.me/${data.whatsapp.replace(/\D/g, "")}`}
  target="_blank"
  className="text-sm underline"
>
  {data.whatsapp}
</a>
            </div>

            {/* BUTTON */}
            <a
              href={data.buttonUrl}
              target="_blank"
              className="bg-[var(--color-primary)] text-white py-3 px-8 rounded-[20px] w-fit text-center"
            >
              {data.buttonText}
            </a>

          </div>

        </div>

      </Container>
    </Section>
  )
}

export default VisitSection
