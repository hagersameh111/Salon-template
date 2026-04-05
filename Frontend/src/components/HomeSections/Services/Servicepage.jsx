import Services from "./Services"
import AddOnsSection from "./AddOnsSection"
import PoliciesBar from "./PoliciesBar"


const ServicesPage = ({ data, addonsData, editMode, onEdit }) => {
  return (
    <div className="relative z-10">

      <Services 
        data={data}
        editMode={editMode}
        onEdit={onEdit}
      />

      <AddOnsSection
        data={addonsData}
        editMode={editMode}
        onEdit={onEdit}
      />

      <PoliciesBar />

    </div>
  )
}

export default ServicesPage