import { useState } from "react";
import "./SignIn.css";
import { toast } from "react-toastify";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(false);

  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // test email
    return emailRegex.test(email);
  };

  const emailToValidate = email;

  const validatePassword = (password) => {
    const minLength = 8;
    return (
      password.length >= minLength
    );
  };

  const passwordToValidate = password;

  const ProceedLogin = async (event) => {
    event.preventDefault();
  
    if (validate()) {
      try {
        const response = await fetch("http://localhost:3004/user/");
        // console.log(response);
        const userData = await response.json();
        // console.log(userData);
        
        if (Object.keys(userData).length === 0) {
          toast.error('Đăng nhập không thành công. Email không tồn tại.');
        } else {
          const matchingUser = userData.find(userData => userData.password === password);
          // console.log(matchingUser);
          if (matchingUser) {
            toast.success('Đăng nhập thành công!');
            navigate('/');
          } else {
            toast.error('Đăng nhập không thành công. Sai mật khẩu.');
          }
        }
      } catch (error) {
        toast.error('Đăng nhập không thành công. ' + error.message);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (!validateEmail(emailToValidate) || email === null || email === '') {
      result = false;
      toast.warning('Email không hợp lệ!')
    }
    if (!validatePassword(passwordToValidate)) {
      result = false;
      toast.warning('Mật khẩu không hợp lệ!')
    }
    return result;
  };

  return (
    <div className="signin w-full h-screen">
      <form className="card" onSubmit={ProceedLogin}>
        <div className="card-content">
          <div className="card-body">
            <div className="left">
              <div className="title text-center">
                <h1>Chào mừng bạn đến với,</h1>
                {/* <br /> */}
                <h1>Minh Long Phát!</h1>
              </div>
              {/* Email */}
              <div className="form-group mb-3">
                <label className="text-gray-600 font-bold">
                  Email <span className="msgerr"> * </span>
                </label>
                <div className="relative max-w-xs">
                  <svg
                    className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    value={email} onChange={event => emailupdate(event.target.value)}
                    type="text"
                    placeholder="user@gmail.com"
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>

              {/* Mật Khẩu */}
              <div className="form-group mb-3">
                <label className="text-gray-600 font-bold">
                  Mật Khẩu <span className="msgerr"> * </span>
                </label>
                <div className="relative max-w-xs mt-2">
                  <button
                    className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                    onClick={() => setPasswordHidden(!isPasswordHidden)}
                  >
                    {isPasswordHidden ? (
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                  <input
                    value={password} onChange={event => passwordupdate(event.target.value)}
                    type={isPasswordHidden ? "password" : "text"}
                    placeholder="********"
                    className="w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div className="card-footer">
                <button
                  type="submit"
                  className="bg-yellow-500 text-black hover:bg-black hover:text-yellow-500 transition-all duration-300 font-bold"
                >
                  Đăng Nhập
                </button>
                <Link to={"/SignUp"}>
                  <button 
                    type="button"
                    className="bg-yellow-500 text-black hover:bg-black hover:text-yellow-500 transition-all duration-300 font-bold"
                  >
                    Đăng ký
                  </button>
                  <p>Chưa có tài khoản? </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
