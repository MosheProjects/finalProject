import React from "react";
import { Card, Button, Form, Alert, Container, InputGroup, FloatingLabel } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("סיסמא לא תואמת");
    }
    if(passwordRef.current.value.length < 8){
      return setError("סיסמא קצרה מדי");
    }    
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setLoading(false);
      return setError("שגיאה ביצירת חשבון");
    }  
    navigate('/addDetailes')
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
              <h2 className="text-center mb-4">הרשמה</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="אימייל"
                    className="mb-3"
                  >
                    <Form.Control type="email" ref={emailRef} required  placeholder="אימייל"/>
                  </FloatingLabel>
                </Form.Group>
                <InputGroup className="mb-3" id="password">
                  <FloatingLabel controlId="floatingPassword" label="סיסמא">
                    <Form.Control type={seePassword ? "text" : "password"} className="rounded-0 rounded-end" placeholder="סיסמא" ref={passwordRef} required aria-describedby="basic-addon1" />
                  </FloatingLabel>
                  <InputGroup.Text id="basic-addon1" className="rounded-0 rounded-start pointer" onClick={(e) => HandleSeePassword(e)}>{seePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3" id="confirm-password">
                  <FloatingLabel controlId="floatingConfirmPassword" label="אימות סיסמא">
                    <Form.Control type={seePassword ? "text" : "password"} className="rounded-0 rounded-end" placeholder="סיסמא" ref={passwordConfirmRef} required aria-describedby="basic-addon1" />
                  </FloatingLabel>
                  <InputGroup.Text id="basic-addon1" className="rounded-0 rounded-start pointer" onClick={(e) => HandleSeePassword(e)}>{seePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</InputGroup.Text>
                </InputGroup>
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  הרשמה
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            יש לך כבר חשבון? <Link to={'/login'}>היכנס</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
