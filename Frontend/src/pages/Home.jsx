import { lazy, Suspense, useState } from "react"
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
const [heroData, setHeroData] = useState({
  title: "Default Title",
  description: "Default Description",
  button: "Book Now",
})

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
              <WhyChoose />
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