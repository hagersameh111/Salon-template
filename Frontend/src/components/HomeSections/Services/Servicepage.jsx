import Services from "./Services"
import AddOnsSection from "./AddOnsSection"
import PoliciesBar from "./PoliciesBar"


const ServicesPage = ({ data, editMode, onEdit }) => {
    return (
    <div>
      <div className="relative z-10">

        {/* ✅ PASS DATA */}
        <Services 
  data={data}
  editMode={editMode}
  onEdit={onEdit}
/>

        <AddOnsSection />

        <PoliciesBar />

      </div>
    </div>
  )
}

export default ServicesPage