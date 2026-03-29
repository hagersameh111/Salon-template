import { lazy, Suspense, useState, useEffect } from "react"
import { motion } from "framer-motion"

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

import useGalleryState from "../hooks/useGalleryState"
import useHeroState from "../hooks/useHeroState"
import useWhyChooseState from "../hooks/useWhyChooseState"
import useAboutState from "../hooks/useAboutState"
import useVisitState from "../hooks/useVisitState"

// Edit Panels
import HeroPanel from "../components/EditPanels/HeroPanel"
import WhyChoosePanel from "../components/EditPanels/WhyChoosePanel"
import GalleryPanel from "../components/EditPanels/GalleryPanel"
import AboutPanel from "../components/EditPanels/AboutPanel"
import VisitPanel from "../components/EditPanels/VisitPanel"


// ================= LAZY SECTIONS =================
const Hero = lazy(() => import("../components/HomeSections/Hero/Hero"))
const TrustBar = lazy(() => import("../components/HomeSections/Bars/TrustBar"))
const WhyChoose = lazy(() => import("../components/HomeSections/WhyChooseUs/WhyChoose"))
const Services = lazy(() => import("../components/HomeSections/Services/Servicepage"))
const GallerySection = lazy(() => import("../components/HomeSections/Gallery/GallerySection"))
const AboutSection = lazy(() => import("../components/HomeSections/About/AboutSection"))
const Reviews = lazy(() => import("../components/HomeSections/Reviews/Reviews"))
const VisitSection = lazy(() => import("../components/HomeSections/VisitUs/VisitSection"))

// ================= ANIMATION WRAPPER =================
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

// ================= MAIN COMPONENT =================
const Home = () => {
const {
  galleryData,
  galleryDraft,
  setGalleryDraft,
  startEditingGallery,
  saveGallery,
  resetGallery,
} = useGalleryState()

const {
  heroData,
  heroDraft,
  setHeroDraft,
  startEditingHero,
  saveHero,
} = useHeroState()

const whyChooseTemplates = [
  "/why-full.jpg",
  "/facial2.jpg",
  "/nails.jpg",
]
const {
  whyChooseData,
  whyChooseDraft,
  setWhyChooseDraft,
  startEditingWhyChoose,
  saveWhyChoose,
  resetWhyChoose,
} = useWhyChooseState()


const {
  aboutData,
  aboutDraft,
  setAboutDraft,
  startEditingAbout,
  saveAbout,
  resetAbout,
} = useAboutState()

const {
  visitData,
  visitDraft,
  setVisitDraft,
  startEditingVisit,
  saveVisit,
  resetVisit,
} = useVisitState()

  // ================= GLOBAL UI STATE =================
  const [editMode, setEditMode] = useState(false)
  const [editingSection, setEditingSection] = useState(null)


  // ================= RENDER =================
  return (
    <>
      {/* ===== Fake Login Button (enter edit mode) ===== */}
      <button
        onClick={() => setEditMode(true)}
        className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded z-[9999]"
      >
        Fake Login
      </button>

      {/* ===== Top Edit Bar ===== */}
      {editMode && (
        <div className="fixed top-0 left-0 w-full h-[60px] bg-white shadow z-[9999] flex items-center justify-between px-6">
          <div className="font-semibold">Edit Mode</div>

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

      {/* ===== HERO PANEL ===== */}
      {editingSection === "hero" && (
        <HeroPanel
          draft={heroDraft}
          setDraft={setHeroDraft}
          onSave={() => {
            saveHero()
            setEditingSection(null)
          }}
          onClose={() => setEditingSection(null)}
        />
      )}

      {/* ===== WHY CHOOSE PANEL ===== */}
      {editingSection === "whyChoose" && (
        <WhyChoosePanel
          draft={whyChooseDraft}
          setDraft={setWhyChooseDraft}
          templates={whyChooseTemplates}
          onSave={() => {
            saveWhyChoose()
            setEditingSection(null)
          }}
          onReset={() => {
            resetWhyChoose()
          }}
        />
      )}

      {/* ===== GALLERY PANEL ===== */}
      {editingSection === "gallery" && (
  <GalleryPanel
    draft={galleryDraft}
    setDraft={setGalleryDraft}
    onSave={() => {
      saveGallery()
      setEditingSection(null)
    }}
    onReset={resetGallery}
  />
)}
{/* ABOUT PANEL */}
{editingSection === "about" && (
  <AboutPanel
    draft={aboutDraft}
    setDraft={setAboutDraft}
    onSave={() => {
      saveAbout()
      setEditingSection(null)
    }}
    onReset={resetAbout}
  />
)}
 {/* VISIT PANEL */}
{editingSection === "visit" && (
  <VisitPanel
    draft={visitDraft}
    setDraft={setVisitDraft}
    onSave={() => {
      saveVisit()
      setEditingSection(null)
    }}
    onReset={resetVisit}
  />
)}


      {/* ===== MAIN SITE ===== */}
      <div className={`min-h-screen flex flex-col ${editMode ? "pt-[60px]" : ""}`}>
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<div className="min-h-[60vh]" />}>

            {/* ===== HERO ===== */}
            <AnimatedSection>
              <Hero
                editMode={editMode}
                heroData={editingSection === "hero" ? heroDraft : heroData}
                onEdit={(section) => {
                  setEditingSection(section)

                  if (section === "hero") {
                    startEditingHero()
                  }
                }}
              />
            </AnimatedSection>

            {/* ===== TRUST BAR ===== */}
            <AnimatedSection delay={0.03}>
              <TrustBar />
            </AnimatedSection>

            {/* ===== WHY CHOOSE ===== */}
            <AnimatedSection delay={0.05}>
              <WhyChoose
                editMode={editMode}
                data={editingSection === "whyChoose" ? whyChooseDraft : whyChooseData}
                onEdit={(section) => {
                  setEditingSection(section)

                  if (section === "whyChoose") {
                    startEditingWhyChoose()
                  }
                }}
              />
            </AnimatedSection>

            {/* ===== باقي السكاشن ===== */}
            <AnimatedSection delay={0.07}>
              <Services />
            </AnimatedSection>

            <AnimatedSection delay={0.09}>
            <GallerySection
  editMode={editMode}
  data={editingSection === "gallery" ? galleryDraft : galleryData}
  onEdit={(section) => {
    setEditingSection(section)

if (section === "gallery") {
  startEditingGallery()
}
  }}
/>
            </AnimatedSection>

            <AnimatedSection delay={0.11}>
              <AboutSection
  editMode={editMode}
  data={editingSection === "about" ? aboutDraft : aboutData}
  onEdit={(section) => {
    setEditingSection(section)

    if (section === "about") {
      startEditingAbout()
    }
  }}
/>
            </AnimatedSection>

            <AnimatedSection delay={0.13}>
              <Reviews />
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <VisitSection
  editMode={editMode}
  data={editingSection === "visit" ? visitDraft : visitData}
  onEdit={(section) => {
    setEditingSection(section)
    if (section === "visit") startEditingVisit()
  }}
/>
            </AnimatedSection>

          </Suspense>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Home