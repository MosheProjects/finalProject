import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext"
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useState } from "react";

export default function PersonalMainPage() {

  const { currenUserInfoState } = useCurrenUserInfo();
  const [loading, setLoading] = useState(false);


  function AddChild(){
    setLoading(true);


  }

  return (
    <div dir="rtl" className="bg-peach p-5 d-flex flex-column flex-md-row justify-content-evenly">
      <div className="d-flex flex-column justify-content-evenly align-items-start m-5">
        <h1>{currenUserInfoState.pName} {currenUserInfoState.sName}</h1>
        <button disabled={loading} className="btn btn-dark fs-4" onClick={AddChild}>הוסף ילד</button>
      </div>
      <div className="d-flex col-8 col-md-3 flex-column  text-center  justify-content-evenly m-5">
        {currenUserInfoState.childrensInfo.map((child, i) => {
          return (<Link key={i} to={`../../child/${child.name}`} className="col-12 text-center btn btn-light rounded-pill m-3">
            <div className='col-12 text-dark text-decoration-none fs-4'>
              {child.name}
            </div>
          </Link>)
        })}
      </div>
    </div>
  )
}
