import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../Context/DataContext";
import ThreeDots from "./ThreeDots";



export default function DevelopmentStep() {
    const {age, test} = useParams();
    const { dataState } = useData();
    const [ curStep, setCurStep ] = useState(null)

    useEffect(() => {
      setCurStep(dataState?.development.find((step)=>step.stepId === age).milestones.find((milestone)=>milestone.id === test))
    }, [dataState])
    
    
    
  return (
    <div dir="rtl" className="bg-peach p-4">
      {/* {!curStep?<ThreeDots/>:

      } */}
      hello
    </div>
  )
}
