import React from "react";
import { Card, Button, Form, Alert, Container, InputGroup, FloatingLabel } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirestore } from '../Context/FireStoreContext'
import { useCurrenUserInfo } from "../Context/CurrenUserInfoContext";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();
  const { getDataFS } = useFirestore();
  const { setCurrenUserInfoState } = useCurrenUserInfo();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);
    await login(emailRef.current.value, passwordRef.current.value)
      .then((person) => { return getDataFS(person.user.uid) })
      .then((userData) => { setCurrenUserInfoState(userData); })
      .then(() => navigate('../../user/main'))
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("שגיאת התחברות נסה שנית!");
      })
  }

  function HandleSeePassword(e) {
    e.preventDefault();
    setSeePassword(!seePassword);
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card dir="rtl">
            <Card.Body>
              <h2 className="text-center mb-4">התחברות</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="אימייל"
                    className="mb-3"
                  >
                    <Form.Control type="email" ref={emailRef} required  placeholder="אימייל" />
                  </FloatingLabel>
                </Form.Group>
                <InputGroup className="mb-3" id="password">
                  <FloatingLabel controlId="floatingPassword" label="סיסמא">
                    <Form.Control type={seePassword ? "text" : "password"} className="rounded-0 rounded-end" placeholder="סיסמא" ref={passwordRef} required aria-describedby="basic-addon1" />
                  </FloatingLabel>
                  <InputGroup.Text id="basic-addon1" className="rounded-0 rounded-start pointer" onClick={(e) => HandleSeePassword(e)}>{seePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</InputGroup.Text>
                </InputGroup>

                <Button disabled={loading} className="w-100 mt-2 " type="submit">
                  התחבר            </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to={'/forgotPassword'}> שכחת סיסמא?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            איך לכם חשבון? <Link to={'/signup'}>הירשמו</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
