import { useState, useEffect } from "react"
import Container from "../../ui/Container"
import { useTranslation } from "react-i18next"
import "./reviews-mobile.css"

const Reviews = ({ data, editMode, onEdit }) => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === "ar"

  // ✅ USE PASSED DATA (CMS STYLE)
  const reviewsData = data
  const reviews = data?.items || []

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reviews.length === 0) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [paused, reviews.length])

  if (reviews.length === 0) return null

  const firstReview = reviews[current]
  const secondReview = reviews[(current + 1) % reviews.length]

  return (
    <section className="py-20 lg:py-32 bg-[#FFFEFC] overflow-hidden relative">

      {/* ✅ EDIT BUTTON */}
      {editMode && (
        <button
  onClick={() => onEdit("reviews")}
  className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm z-[999]"
>
  ✏ Edit
</button>
      )}

      <Container>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT */}
          <div className={`text-center ${isRTL ? "lg:text-right lg:mr-0 lg:ml-auto" : "lg:text-left"}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-[86px] leading-[1.05] lg:leading-[0.95] font-semibold text-[var(--color-primary-soft)] mb-8 lg:mb-12 whitespace-pre-line">
              {t("reviews.title")}
            </h2>

            <p className="text-lg sm:text-xl lg:text-[36px] leading-[1.6] text-[#7A7472] max-w-[500px] mx-auto lg:mx-0">
              {t("reviews.subtitle")}
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">

            {/* MOBILE + TABLET */}
            <div className="reviews-mobile-wrapper relative w-full lg:hidden">

              <img
                key={reviewsData?.backgroundImage} // ✅ add key to force re-render on image change
                src={reviewsData?.backgroundImage}
                alt=""
                className="reviews-mobile-bg w-full object-cover rounded-[30px]"
              />

              <div className="reviews-mobile-overlay absolute inset-0 flex flex-col justify-center">
                <ReviewCard review={firstReview} isRTL={isRTL} />
                <ReviewCard review={secondReview} isRTL={isRTL} />
              </div>

            </div>

            {/* DESKTOP */}
            <div className="hidden lg:block relative w-[520px] h-[800px]">

              <img
                key={reviewsData?.backgroundImage} // ✅ add key to force re-render on image change
                src={reviewsData?.backgroundImage}
                alt=""
                className="w-full h-full object-cover rounded-[40px]"
              />

              <ReviewCard
                review={firstReview}
                position="top"
                setPaused={setPaused}
                isRTL={isRTL}
              />

              <ReviewCard
                review={secondReview}
                position="bottom"
                setPaused={setPaused}
                isRTL={isRTL}
              />

            </div>

          </div>

        </div>

      </Container>
    </section>
  )
}

// ================= CARD =================
const ReviewCard = ({ review, position, setPaused, isRTL }) => {

  const positionStyles =
    position === "top"
      ? "absolute top-[120px] left-[-60px]"
      : "absolute bottom-[120px] right-[-60px]"

  return (
    <div
      onMouseEnter={() => setPaused?.(true)}
      onMouseLeave={() => setPaused?.(false)}
      className={`${position ? positionStyles : ""} ${isRTL ? "text-right" : "text-left"}
      review-card
      w-full lg:w-[650px]
      bg-[#5A4A43]/60
      backdrop-blur-xl
      text-white
      rounded-[30px] lg:rounded-[40px]
      p-5 sm:p-5 lg:p-5
      shadow-2xl
      transition-transform duration-500
      hover:scale-105`}
    >

      <h4 className={`text-xl lg:text-2xl font-semibold mb-4 ${isRTL ? "text-right" : ""}`}>
        {review.name}
      </h4>

      <p className={`text-sm sm:text-base leading-relaxed mb-2 ${isRTL ? "text-right" : ""}`}>
        {review.content}
      </p>

      <div className="flex justify-center gap-4 lg:gap-6 text-xl lg:text-2xl">
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            className={
              star <= review.rating
                ? "text-yellow-400"
                : "text-white/40"
            }
          >
            ★
          </span>
        ))}
      </div>

    </div>
  )
}

export default Reviews