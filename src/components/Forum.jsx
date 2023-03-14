import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import { useFirestore } from "../Context/FireStoreContext";
import { useAuth } from "../Context/AuthContext";
import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext";

export default function Forum() {
  const [forumdata, setForumData] = useState({ forum: [] });
  const [forumsInfo, setForumsInfo] = useState({});
  const [message, setMessage] = useState("");
  const [flag,setFlag]=useState(false);
  const { currentUser } = useAuth();
  const { currenUserInfoState, setCurrenUserInfoState } = useCurrenUserInfo();
  const { addFsForum, getDataFsForum } = useFirestore();
  const messageRef = useRef();
  const colors = ["red", "blue", "green", "yellow", "brown", "orange", "pink"];
  
  useEffect(() => {
    getDataFsForum("forumMessages").then((data) => {
      setForumData(data);
      setFlag(true)
    });
  }, []);
  
  useEffect(() => {
    if(flag)
    addFsForum("forumMessages", forumdata).then(() => {
      getDataFsForum("forumMessages").then((data) => {
        setForumsInfo(data);
      });
      const names = forumdata.forum.map((message)=> message.name);
      let uniqeNames = [...new Set(names)];
      let colorByName = uniqeNames.map((person, i)=>{return{name:person,color:colors[i]}})
    });
  }, [forumdata]);

  function handleSubmit(e) {
    setMessage("");
    console.log("ref:", messageRef.current.value);
    e.preventDefault();
    const newObj = {
      name: currenUserInfoState.pName + currenUserInfoState.sName,
      message: messageRef.current.value,
    };
    const newArray = [...forumdata.forum, newObj];
    console.log("newArr:", newArray);
    setForumData({ ...forumdata, forum: newArray });
  }
  let p = 0;
  return (
    <div
      dir="rtl"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1>פורום ייעוץ להורים</h1>
      {forumsInfo.forum ? (
        forumsInfo.forum.map((item) => {
          if (p === colors.length) p = 0;
          return (
            <div className="border rounded w-50" style={{ height: "100px" }}>
              <p style={{ fontWeight: "bold", color: colors[p++] }}>
                {item.name}
              </p>
              <span>{item.message}</span>
            </div>
          );
        })
      ) : (
        <p>this is a place to share your thoughts</p>
      )}
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingTextarea2" label="כתוב משהו...">
          <Form.Control
            as="textarea"
            style={{ height: "100px", width: "500px" }}
            ref={messageRef}
            required
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={()=>{
                getDataFsForum("forumMessages")
                    .then((data) => {setForumsInfo(data);});
                }}
          />
        </FloatingLabel>
        <Button type="submit">הוסף תגובה</Button>
      </Form>
    </div>
  );
}