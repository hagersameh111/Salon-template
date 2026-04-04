import { lazy, Suspense, useState } from "react"
import { motion } from "framer-motion"

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ServicesPage from "../components/HomeSections/Services/Servicepage"

// ================= CUSTOM STATE HOOKS =================
import useGalleryState from "../hooks/useGalleryState"
import useHeroState from "../hooks/useHeroState"
import useWhyChooseState from "../hooks/useWhyChooseState"
import useAboutState from "../hooks/useAboutState"
import useVisitState from "../hooks/useVisitState"
import useFooterState from "../hooks/useFooterState"
import useServicesState from "../hooks/useServicesState"
import useAddonsState from "../hooks/useAddonsState"
import useReviewsState from "../hooks/useReviewsState"

// ================= EDIT PANELS =================
import HeroPanel from "../components/EditPanels/HeroPanel"
import WhyChoosePanel from "../components/EditPanels/WhyChoosePanel"
import GalleryPanel from "../components/EditPanels/GalleryPanel"
import AboutPanel from "../components/EditPanels/AboutPanel"
import VisitPanel from "../components/EditPanels/VisitPanel"
import FooterPanel from "../components/EditPanels/FooterPanel"
import ServicesPanel from "../components/EditPanels/ServicesPanel"
import AddonsPanel from "../components/EditPanels/AddonsPanel"
import ReviewsPanel from "../components/EditPanels/ReviewsPanel"

// ================= LAZY LOADED SECTIONS =================
const Hero = lazy(() => import("../components/HomeSections/Hero/Hero"))
const TrustBar = lazy(() => import("../components/HomeSections/Bars/TrustBar"))
const WhyChoose = lazy(() => import("../components/HomeSections/WhyChooseUs/WhyChoose"))
const GallerySection = lazy(() => import("../components/HomeSections/Gallery/GallerySection"))
const AboutSection = lazy(() => import("../components/HomeSections/About/AboutSection"))
const Reviews = lazy(() => import("../components/HomeSections/Reviews/Reviews"))
const VisitSection = lazy(() => import("../components/HomeSections/VisitUs/VisitSection"))

// ================= ANIMATION WRAPPER =================
const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
)

// ================= MAIN COMPONENT =================
const Home = () => {

  // ================= GLOBAL UI STATE =================
  const [editMode, setEditMode] = useState(false)
  const [editingSection, setEditingSection] = useState(null)

  // ================= SECTION STATES =================
  const gallery = useGalleryState()
  const hero = useHeroState()
  const whyChoose = useWhyChooseState()
  const about = useAboutState()
  const visit = useVisitState()
  const footer = useFooterState()
  const services = useServicesState()
  const addons = useAddonsState()
  const reviews = useReviewsState()

  // ================= STATIC DATA =================
  const whyChooseTemplates = [
    "/why-full.jpg",
    "/facial2.jpg",
    "/nails.jpg",
  ]

  return (
    <>
      {/* ================= ENTER EDIT MODE ================= */}
      <button
        onClick={() => setEditMode(true)}
        className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded z-[9999]"
      >
        Fake Login
      </button>

      {/* ================= TOP EDIT BAR ================= */}
      {editMode && (
        <div className="fixed top-0 left-0 w-full h-[60px] bg-white shadow z-[9999] flex items-center justify-between px-6">
          <div className="font-semibold">Edit Mode</div>

          <div className="flex gap-4 items-center">
            <button className="text-sm">Theme</button>
            <button className="text-sm">Preview</button>

            <button className="bg-pink-500 text-white px-4 py-1 rounded">
              Save
            </button>

            <button onClick={() => setEditMode(false)} className="text-sm">
              Exit
            </button>
          </div>
        </div>
      )}

      {/* ================= EDIT PANELS ================= */}

      {editingSection === "hero" && (
        <HeroPanel
          draft={hero.heroDraft}
          setDraft={hero.setHeroDraft}
          onSave={() => {
            hero.saveHero()
            setEditingSection(null)
          }}
          onClose={() => setEditingSection(null)}
        />
      )}

      {editingSection === "whyChoose" && (
        <WhyChoosePanel
          draft={whyChoose.whyChooseDraft}
          setDraft={whyChoose.setWhyChooseDraft}
          templates={whyChooseTemplates}
          onSave={() => {
            whyChoose.saveWhyChoose()
            setEditingSection(null)
          }}
          onReset={whyChoose.resetWhyChoose}
        />
      )}

      {editingSection === "gallery" && (
        <GalleryPanel
          draft={gallery.galleryDraft}
          setDraft={gallery.setGalleryDraft}
          onSave={() => {
            gallery.saveGallery()
            setEditingSection(null)
          }}
          onReset={gallery.resetGallery}
        />
      )}

      {editingSection === "about" && (
        <AboutPanel
          draft={about.aboutDraft}
          setDraft={about.setAboutDraft}
          onSave={() => {
            about.saveAbout()
            setEditingSection(null)
          }}
          onReset={about.resetAbout}
        />
      )}

      {editingSection === "visit" && (
        <VisitPanel
          draft={visit.visitDraft}
          setDraft={visit.setVisitDraft}
          onSave={() => {
            visit.saveVisit()
            setEditingSection(null)
          }}
          onReset={visit.resetVisit}
        />
      )}

      {editingSection === "footer" && (
        <FooterPanel
          draft={footer.footerDraft}
          setDraft={footer.setFooterDraft}
          onSave={() => {
            footer.saveFooter()
            setEditingSection(null)
          }}
          onReset={footer.resetFooter}
        />
      )}

      {editingSection === "services" && (
        <ServicesPanel
          data={services.servicesDraft}
          setData={services.setServicesDraft}
          onSave={() => {
            services.saveServices()
            setEditingSection(null)
          }}
          onReset={() => services.setServicesDraft(services.servicesData)}
          onClose={() => setEditingSection(null)}
        />
      )}

      {editingSection === "addons" && (
        <AddonsPanel
          data={addons.addonsDraft}
          setData={addons.setAddonsDraft}
          onSave={() => {
            addons.saveAddons()
            setEditingSection(null)
          }}
          onReset={() => addons.setAddonsDraft(addons.addonsData)}
          onClose={() => setEditingSection(null)}
        />
      )}

      {editingSection === "reviews" && (
        <ReviewsPanel
          data={reviews.reviewsDraft}
          setData={reviews.setReviewsDraft}
          onSave={() => {
            reviews.saveReviews()
            setEditingSection(null)
          }}
          onReset={() => reviews.setReviewsDraft(reviews.reviewsData)}
          onClose={() => setEditingSection(null)}
        />
      )}

      {/* ================= MAIN SITE ================= */}
      <div className={`min-h-screen flex flex-col ${editMode ? "pt-[60px]" : ""}`}>
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<div className="min-h-[60vh]" />}>

            {/* HERO */}
            <AnimatedSection>
              <Hero
                editMode={editMode}
                heroData={editingSection === "hero" ? hero.heroDraft : hero.heroData}
                onEdit={(section) => {
                  setEditingSection(section)
                  if (section === "hero") hero.startEditingHero()
                }}
              />
            </AnimatedSection>

            {/* TRUST BAR */}
            <AnimatedSection delay={0.03}>
              <TrustBar />
            </AnimatedSection>

            {/* WHY CHOOSE */}
            <AnimatedSection delay={0.05}>
              <WhyChoose
                editMode={editMode}
                data={editingSection === "whyChoose" ? whyChoose.whyChooseDraft : whyChoose.whyChooseData}
                onEdit={(section) => {
                  setEditingSection(section)
                  if (section === "whyChoose") whyChoose.startEditingWhyChoose()
                }}
              />
            </AnimatedSection>

            {/* SERVICES + ADDONS */}
            <AnimatedSection delay={0.07}>
              <ServicesPage
                data={editingSection === "services" ? services.servicesDraft : services.servicesData}
                addonsData={editingSection === "addons" ? addons.addonsDraft : addons.addonsData}
                editMode={editMode}
                onEdit={(section) => {
                  setEditingSection(section)

                  if (section === "services") services.startEditingServices()
                  if (section === "addons") addons.startEditingAddons()
                }}
              />
            </AnimatedSection>

            {/* GALLERY */}
            <AnimatedSection delay={0.09}>
              <GallerySection
                editMode={editMode}
                data={editingSection === "gallery" ? gallery.galleryDraft : gallery.galleryData}
                onEdit={(section) => {
                  setEditingSection(section)
                  if (section === "gallery") gallery.startEditingGallery()
                }}
              />
            </AnimatedSection>

            {/* ABOUT */}
            <AnimatedSection delay={0.11}>
              <AboutSection
                editMode={editMode}
                data={editingSection === "about" ? about.aboutDraft : about.aboutData}
                onEdit={(section) => {
                  setEditingSection(section)
                  if (section === "about") about.startEditingAbout()
                }}
              />
            </AnimatedSection>

            {/* REVIEWS */}
            <AnimatedSection delay={0.13}>
              <Reviews
                data={editingSection === "reviews" ? reviews.reviewsDraft : reviews.reviewsData}
                editMode={editMode}
                onEdit={(section) => {
                  setEditingSection(section)
                  if (section === "reviews") reviews.startEditingReviews()
                }}
              />
            </AnimatedSection>

            {/* VISIT */}
            <AnimatedSection delay={0.15}>
              <VisitSection
                editMode={editMode}
                data={editingSection === "visit" ? visit.visitDraft : visit.visitData}
                onEdit={(section) => {
                  setEditingSection(section)
                  if (section === "visit") visit.startEditingVisit()
                }}
              />
            </AnimatedSection>

          </Suspense>
        </main>

        {/* FOOTER */}
        <Footer
          editMode={editMode}
          data={editingSection === "footer" ? footer.footerDraft : footer.footerData}
          onEdit={(section) => {
            setEditingSection(section)
            if (section === "footer") footer.startEditingFooter()
          }}
        />
      </div>
    </>
  )
}

export default Home