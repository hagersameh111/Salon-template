import { lazy, Suspense, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const HeroImport = () => import("../components/HomeSections/Hero/Hero")
const Hero = lazy(HeroImport)

const TrustBar = lazy(() => import("../components/HomeSections/Bars/TrustBar"))
const WhyChoose = lazy(() => import("../components/HomeSections/WhyChooseUs/WhyChoose"))
const Services = lazy(() => import("../components/HomeSections/Services/Servicepage"))
const GallerySection = lazy(() => import("../components/HomeSections/Gallery/GallerySection"))
const AboutSection = lazy(() => import("../components/HomeSections/About/AboutSection"))
const Reviews = lazy(() => import("../components/HomeSections/Reviews/Reviews"))
const VisitSection = lazy(() => import("../components/HomeSections/VisitUs/VisitSection"))

const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.55, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
)

const Home = () => {
const [editMode, setEditMode] = useState(false)
const [editingSection, setEditingSection] = useState(null)

// GLOBAL STATE for Hero (temporary step)
const [heroData, setHeroData] = useState(() => {
  const saved = localStorage.getItem("heroData")

  if (saved) {
    return JSON.parse(saved)
  }

  return {
    title: "Default Title",
    description: "Default Description",
    button: "Book Now",
  }
})
// SAVE HERO
useEffect(() => {
  localStorage.setItem("heroData", JSON.stringify(heroData))
}, [heroData])

// GLOBAL STATE for WhyChoose (temporary step)
const whyChooseTemplates = [
  "/why-full.jpg",
  "/facial2.jpg",
  "/nails.jpg",
]
const [whyChooseData, setWhyChooseData] = useState(() => {
  const saved = localStorage.getItem("whyChooseData")

  if (saved) {
    return JSON.parse(saved)
  }

  return {
    title: "Why Choose SŌRA?",
    subtitle: "A personalized skincare experience focused on real, lasting results.",
    image: "/why-full.jpg",
    features: [
      {
        id: "hijabFriendly",
        title: "Hijab-Friendly",
        desc: "Only female staff and no CCTV for your privacy",
      },
      {
        id: "customized",
        title: "Customized Treatments",
        desc: "Every facial is tailored to your unique skin needs and goals.",
      },
    ],
  }
})
// SAVE WHY-CHOOSE
useEffect(() => {
  localStorage.setItem("whyChooseData", JSON.stringify(whyChooseData))
}, [whyChooseData])

  return (
    <>
    <button
  onClick={() => setEditMode(true)}
  className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded z-[9999]"
>
  Fake Login
</button>
      {/* Edit Mode Bar */}
      {editMode && (
        <div className="fixed top-0 left-0 w-full h-[60px] bg-white shadow z-[9999] flex items-center justify-between px-6">
          
          <div className="font-semibold">
            Edit Mode
          </div>

          <div className="flex gap-4 items-center">
            <button className="text-sm">Theme</button>
            <button className="text-sm">Preview</button>

            <button className="bg-pink-500 text-white px-4 py-1 rounded">
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="text-sm"
            >
              Exit
            </button>
          </div>

        </div>
      )}

      {/* Hero Edit Panel */}
      {editingSection === "hero" && (
  <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4">

    <h2 className="font-semibold mb-4">Edit Hero</h2>

    {/* Title */}
    <input
      value={heroData.title}
      onChange={(e) =>
        setHeroData({
          ...heroData,
          title: e.target.value,
        })
      }
      className="w-full border p-2 mb-3"
    />

    {/* Description */}
    <textarea
      value={heroData.description}
      onChange={(e) =>
        setHeroData({
          ...heroData,
          description: e.target.value,
        })
      }
      className="w-full border p-2 mb-3"
    />

    {/* Button */}
    <input
      value={heroData.button}
      onChange={(e) =>
        setHeroData({
          ...heroData,
          button: e.target.value,
        })
      }
      className="w-full border p-2 mb-3"
    />

    {/* Close */}
    <button
      onClick={() => setEditingSection(null)}
      className="bg-pink-500 text-white px-4 py-2 rounded w-full"
    >
      Save
    </button>

  </div>
)}

{/* WhyChoose Edit Panel */}
{editingSection === "whyChoose" && (
  <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto pb-20">

    <h2 className="font-semibold mb-4">Edit Why Choose</h2>

    {/* Title Input */}
    <input
      value={whyChooseData.title}
      onChange={(e) =>
        setWhyChooseData({
          ...whyChooseData,
          title: e.target.value,
        })
      }
      className="w-full border p-2 mb-3"
    />

    {/* Subtitle Input */}
    <textarea
      value={whyChooseData.subtitle}
      onChange={(e) =>
        setWhyChooseData({
          ...whyChooseData,
          subtitle: e.target.value,
        })
      }
      className="w-full border p-2 mb-3"
    />

    {/* Features List */}
    {whyChooseData.features.map((item, index) => (
      <div key={index} className="mb-4 border-t pt-3">

        <p className="text-sm mb-1">Feature {index + 1}</p>

        {/* Feature Title */}
        <input
          value={item.title}
          onChange={(e) => {
            // copy array (immutable update)
            const updated = [...whyChooseData.features]

            // update specific item
            updated[index].title = e.target.value

            // set new state
            setWhyChooseData({
              ...whyChooseData,
              features: updated,
            })
          }}
          className="w-full border p-2 mb-2"
        />

        {/* Feature Description */}
        <textarea
          value={item.desc}
          onChange={(e) => {
            const updated = [...whyChooseData.features]
            updated[index].desc = e.target.value

            setWhyChooseData({
              ...whyChooseData,
              features: updated,
            })
          }}
          className="w-full border p-2"
        />

        {/* ✅ DELETE BUTTON (must be inside map to access index) */}
        <button
          onClick={() => {
            // remove selected item using filter
            const updated = whyChooseData.features.filter((_, i) => i !== index)

            setWhyChooseData({
              ...whyChooseData,
              features: updated,
            })
          }}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm mt-2"
        >
          Delete
        </button>

      </div>
    ))}

    {/* ✅ ADD FEATURE BUTTON */}
<button
  onClick={() => {
    // prevent adding if limit reached
    if (whyChooseData.features.length >= 5) return

    setWhyChooseData({
      ...whyChooseData,
      features: [
        ...whyChooseData.features,
        {
          id: Date.now(),
          title: "New Feature",
          desc: "Description...",
        },
      ],
    })
  }}
  disabled={whyChooseData.features.length >= 5}
  className={`px-3 py-2 rounded w-full mb-3 ${
    whyChooseData.features.length >= 5
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-gray-200"
  }`}
>
  + Add Feature
</button>

    {/* Save / Close Panel */}
    <button
      onClick={() => setEditingSection(null)}
      className="bg-pink-500 text-white px-4 py-2 rounded w-full"
    >
      Save
    </button>

  {/* Templates */}
<div className="mb-3">
  <p className="text-sm mb-2">Choose Template</p>

  <div className="flex gap-2">
    {whyChooseTemplates.map((img, i) => (
      <img
        key={i}
        src={img}
        onClick={() =>
          setWhyChooseData({
            ...whyChooseData,
            image: img,
          })
        }
        className="w-16 h-16 object-cover rounded cursor-pointer border hover:scale-105 transition"
      />
    ))}
  </div>
</div>

{/* IMAGE UPLOAD (must be outside features map) */}
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setWhyChooseData({
        ...whyChooseData,
        image: reader.result, // base64 image
      })
    }

    reader.readAsDataURL(file)
  }}
  className="w-full mb-3"
/>

  </div>
)}

      {/*site content*/}
      <div className={`min-h-screen flex flex-col ${editMode ? "pt-[60px]" : ""}`}>
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            
            <div id="hero">
              <AnimatedSection>
                <Hero editMode={editMode} heroData={heroData} onEdit={setEditingSection} />
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.03}>
              <TrustBar />
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <WhyChoose 
                editMode={editMode}
                data={whyChooseData}
                onEdit={setEditingSection}/>
            </AnimatedSection>

            <div id="services">
              <AnimatedSection delay={0.07}>
                <Services />
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.09}>
              <GallerySection />
            </AnimatedSection>

            <AnimatedSection delay={0.11}>
              <AboutSection />
            </AnimatedSection>

            <AnimatedSection delay={0.13}>
              <Reviews />
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <VisitSection />
            </AnimatedSection>

          </Suspense>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Home