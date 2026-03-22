import { useEffect, useState } from "react"
import Container from "../../ui/Container"
import Button from "../../ui/Button"
import { brand } from "../../../config/brand"
import { useTranslation } from "react-i18next"
import "./hero-responsive.css"
import MobileHero from "./MobileHero"

const Hero = ({ editMode }) => {
  const [current, setCurrent] = useState(0)
  const heroSlides = brand.data.heroSlides
  const { t, i18n } = useTranslation()

  // State that holds editable content instead of using t() directly
const [heroData, setHeroData] = useState(() => {
  const saved = localStorage.getItem("heroData")

  // لو في بيانات محفوظة → استخدمها
  if (saved) {
    return JSON.parse(saved)
  }

  // غير كده → default من الترجمة
  return {
    title: t("hero.title"),
    description: t("hero.description"),
    button: t("hero.button"),
  }
})

useEffect(() => {
  localStorage.setItem("heroData", JSON.stringify(heroData))
}, [heroData])

  // Controls opening/closing the editor panel
  const [openEditor, setOpenEditor] = useState(false)

  const isRTL = i18n.language === "ar"

  // Slider logic (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [heroSlides.length])

  return (
    <>
      <section className="lg:hidden">
        <MobileHero />
      </section>

      <section
        className={`hidden lg:block relative bg-[var(--color-bg-main)] overflow-hidden ${isRTL ? "hero-force-ltr" : ""}`}
      >
        {/* EDIT BUTTON (only appears in edit mode) */}
        {editMode && (
          <button
            onClick={() => setOpenEditor(true)}
            className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-20"
          >
            ✏ Edit
          </button>
        )}

        <div
          className="absolute inset-0 bg-repeat bg-[length:511px] opacity-[1] pointer-events-none"
          style={{ backgroundImage: "url('/overlay.svg')" }}
        />

        <div className="relative z-10 px-4 sm:px-6 lg:px-6 py-10 lg:py-8 xl:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-center">

              {/* LEFT TEXT */}
              <div
                className={`max-w-[760px] text-center ${isRTL ? "lg:text-right" : "lg:text-left"} mx-auto lg:mx-0 ${
                  isRTL ? "hero-ar" : ""
                }`}
              >
                {/* ❌ You were using t("heroData.title") (wrong)
                   ✅ Now using editable state */}
                <h1 className="font-semibold text-4xl lg:text-[56px] xl:text-[68px] leading-[1.05] text-[var(--color-accent)] whitespace-pre-line mb-4">
                  {heroData.title}
                </h1>

                <p className="font-extralight text-base lg:text-xl xl:text-[24px] text-[var(--color-text-main)] max-w-[760px] mx-auto lg:mx-0 mb-8">
                  {heroData.description}
                </p>

                <div className="inline-flex flex-col items-stretch w-fit">
                  <a
                    href="https://visibook.com/soraaesthetics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit"
                  >
                    <Button className="w-full">
                      <div className="flex items-center gap-3 justify-center">
                        <img src="/calendar.svg" className="w-5 h-5" />

                        {/* ✅ Editable button text */}
                        {heroData.button}
                      </div>
                    </Button>
                  </a>

                  <img
                    src="/trust1.svg"
                    alt="Trust badges"
                    className="w-[calc(100%-2px)] mt-3 opacity-90 mx-auto"
                  />
                </div>
              </div>

              {/* RIGHT IMAGES */}
              <div className="relative flex justify-center lg:justify-end [direction:ltr]">
                <div className="relative w-[300px] xl:w-[420px]">

                  <div className="relative h-[360px] xl:h-[483px]">

                    {/* MAIN IMAGE */}
                    <div className="absolute right-0 top-0 w-[240px] h-[320px] xl:w-[380px] xl:h-[483px] rounded-[40px] xl:rounded-[50px] overflow-hidden">
                      <img
                        key={heroSlides[current].main}
                        src={heroSlides[current].main}
                        loading="eager"
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 ease-in-out opacity-100 animate-fadeIn"
                      />
                    </div>

                    {/* SECONDARY IMAGE */}
                    <div className="absolute -left-[30px] top-[24px] xl:-left-[100px] xl:top-[53px] w-[170px] h-[220px] xl:w-[268px] xl:h-[335px] rounded-[30px] xl:rounded-[40px] overflow-hidden shadow-xl">
                      <img
                        key={`${current}-secondary`}
                        src={heroSlides[current].secondary}
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 ease-in-out opacity-100 animate-fadeIn"
                      />
                    </div>

                    {/* DOTS */}
                    <div className="hero-dots">
                      {heroSlides.map((_, index) => (
                        <div
                          key={index}
                          className={`
                            w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white
                            transition-all duration-500 ease-in-out
                            ${
                              current === index
                                ? "bg-white scale-110"
                                : "bg-transparent opacity-60"
                            }
                          `}
                        />
                      ))}
                    </div>

                  </div>

                  {/* SOCIAL */}
                  <div className="mt-[5px] w-[240px] xl:w-[380px] ml-auto flex justify-center gap-2">
                    <a
                      href="https://www.instagram.com/soraaesthetics_"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/insta-icon.svg" className="hero-social" />
                    </a>

                    <a
                      href="https://web.facebook.com/SoraAesthetics"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/face-icon.svg" className="hero-social" />
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </Container>
        </div>
      </section>

      {/* EDITOR PANEL */}
      {openEditor && (
        <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4">

          <h2 className="font-semibold mb-4">Edit Hero</h2>

          {/* Title input */}
          <input
            value={heroData.title}
            onChange={(e) =>
              setHeroData({ ...heroData, title: e.target.value })
            }
            className="w-full border p-2 mb-3"
          />

          {/* Description input */}
          <textarea
            value={heroData.description}
            onChange={(e) =>
              setHeroData({ ...heroData, description: e.target.value })
            }
            className="w-full border p-2 mb-3"
          />

          {/* Button text */}
          <input
            value={heroData.button}
            onChange={(e) =>
              setHeroData({ ...heroData, button: e.target.value })
            }
            className="w-full border p-2 mb-3"
          />

          {/* Close panel */}
          <button
            onClick={() => setOpenEditor(false)}
            className="bg-pink-500 text-white px-4 py-2 rounded w-full"
          >
            Save
          </button>

        </div>
      )}
    </>
  )
}

export default Hero