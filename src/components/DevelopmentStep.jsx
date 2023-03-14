import { useParams } from "react-router-dom";


export default function DevelopmentStep() {
    const {age, test} = useParams();
    
  return (
    <div>DevelopmentStep</div>
  )
}
