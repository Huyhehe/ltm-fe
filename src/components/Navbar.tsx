import { Button, Checkbox, Input, Modal, Row, Text } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncLogin, asyncRegister, reset } from "../store/authSlice";
import { RootState } from "../store/store";
import GG from "../assets/images/search.png";
import { API_ENDPOINT } from "../utils/constants";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setEmail("");
    setPassword("");
    setVisible(false);
    setIsRegister(false);
  };
  const showLoginForm = async () => {
    setVisible(true);
  };

  const handleLoginOAuth = () => {
    window.open(`${API_ENDPOINT}/api/auth/google`, "_self");
  };

  const handleLogin = async () => {
    dispatch(asyncLogin({ email, password }) as any);
    setVisible(false);
  };

  const handleRegister = async () => {
    dispatch(asyncRegister({ email, password }) as any);
    setIsRegister(false);
  };

  const handleLogout = () => {
    dispatch(reset());
  };

  return (
    <div className="w-screen relative py-2 z-50">
      <div className="flex items-center font-mono h-full px-12 justify-between z-50">
        <h1 className="text-3xl font-black text-slate-200 z-50">
          <Link to={"/"} className="text-inherit">
            SimpleOJ
          </Link>
        </h1>
        <div className="flex items-center z-50">
          <Link
            to="/create"
            className="mr-8 p-1 px-3 border border-slate-300 rounded-sm text-white hover:bg-white hover:text-black"
          >
            Add Problem
          </Link>
          {user && (
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={handleLogout}
            >
              <img
                src={user.image}
                alt=""
                className="w-8 h-8 rounded-full object-cover object-center"
              />
              <p className="m-0 text-white text-sm hover:underline">
                {user.displayName}
              </p>
            </div>
          )}
          {!user && (
            <button
              className="p-1 px-3 bg-white rounded"
              onClick={showLoginForm}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="absolute w-full h-full bg-[#322b39] top-0 -z-1"></div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to{" "}
            <Text b size={18}>
              SimpleOJ
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className="flex-col" justify="flex-end">
            <div className="w-full flex justify-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>Forgot password?</Text>
            </div>
            <Text
              className="self-end"
              onClick={() => {
                if (isRegister) {
                  return setIsRegister(false);
                }
                setIsRegister(true);
              }}
              size={14}
            >
              {isRegister ? "Login" : "Register"}
            </Text>
          </Row>
          <Row
            className="w-full flex !items-center !justify-center gap-2 py-4 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all"
            onClick={handleLoginOAuth}
          >
            <img src={GG} alt="gg" className="aspect-square w-6" />
            <span className="font-bold">Continue with Google account</span>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          {isRegister ? (
            <Button auto onPress={handleRegister}>
              Sign up
            </Button>
          ) : (
            <Button auto onPress={handleLogin}>
              Sign in
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
