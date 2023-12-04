import "./SignUp.css";
import {toast} from "react-toastify";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const SignUp = () => {

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [password, passwordchange] = useState("");
  const [address, addresschange] = useState("");

  const [isPasswordHidden, setPasswordHidden] = useState(false);

  const navigate = useNavigate();

  // Đặt điều kiện validate
  const validateEmail = (email) => {
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // test email
    return emailRegex.test(email);
  }

  const emailToValidate = email;

  const validateFullname = (name) => {
    // 
    const minLength = 3;
    const maxLength = 16; 
    const allowedCharacters = /^[\p{L} .'-]+$/u;
    // 
    return (
      name.length >= minLength &&
      name.length <= maxLength && 
      allowedCharacters.test(name)
    );
  };

  const nameToValidate = name;

  const validatePassword = (password) => {
    const minLength = 8;
    return (
      password.length >= minLength
    );
  };

  const passwordToValidate = password;

  // End đặt điều kiện validate

  const isValidate = () => {
    let isproceed = true;
    let errormessage = '';
    if (name === null || name === ''){
      isproceed = false;
      errormessage += 'Bạn đã bỏ sót phần Họ và Tên.';
    }
    if (!validateFullname(nameToValidate)) {
      isproceed = false;
      errormessage += 'Họ và Tên không hợp lệ.'
    }
    if (phone === null || phone === ''){
      isproceed = false;
      errormessage += ' Bạn đã bỏ sót phần Số Điện Thoại.';
    }
    if (phone.length < 10) {
      isproceed = false;
      errormessage += ' Số điện thoại không hợp lệ.'
    }
    if (!validateEmail(emailToValidate) || email === null || email === '') {
      isproceed = false;
      errormessage += ' Email không hợp lệ. Vui lòng nhập lại email.'
    }
    if (!validatePassword(passwordToValidate)) {
      isproceed = false;
      errormessage += ' Xin nhập password từ 8 ký tự trở lên.';
    }
    if (!isproceed){
      toast.warning(errormessage);
    }
    return isproceed;
  }

  const handleSubmit = event => {

    // stop page reload when submit
    event.preventDefault();

    let regobj =  {id, name, email, phone, password, address};
    // console.log (regobj);
    // console.log (regobj.phone.length);

    // Validation
    if(isValidate()){
      fetch("http://localhost:3004/user",{
          method: "POST",
          headers: {'content-type':'application/json'},
          body: JSON.stringify(regobj)
      }).then((res)=>{
          toast.success('Đăng ký thành công!')
          navigate('/signin');
      }).catch((err)=>{
          toast.error('Thất bại :' + err.message)
      });
    }
  }

  return (
    <div className="signup w-full h-screen">
      <div className="card-header text-center">
        <h1>Tạo tài khoản</h1>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-content">
          <div className="card-body">
            <div className="left mr-9">
              {/* Họ và Tên */}
              <div className="form-group mb-3">
                <label
                  for="username"
                  className="block py-2 text-gray-600 font-bold"
                >
                  Họ và Tên <span className="msgerr"> * </span>
                </label>
                <div className="relative max-w-xs text-gray-500">
                  <input
                    value={name}
                    onChange={event => namechange(event.target.value)}
                    type="text"
                    placeholder="Phạm Tiến Đạt"
                    id="username"
                    className=" w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>

              {/* Điện Thoại */}
              <div className="form-group mb-3">
                <label className="text-gray-600 font-bold">
                  Số Điện Thoại <span className="msgerr"> * </span>
                </label>
                <div className="relative mt-2 max-w-xs text-gray-500">
                  <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                    <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                      <option>VN</option>
                      {/* <option>ES</option>
                    <option>MR</option> */}
                    </select>
                  </div>
                  <input
                    value={phone}
                    onChange={event => phonechange(event.target.value)}
                    type="number"
                    placeholder="0934 123 533"
                    className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="right">
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
                    value={email}
                    onChange={event => emailchange(event.target.value)}
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
                <div className="relative max-w-xs mt-2" >
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
                    value={password}
                    onChange={event => passwordchange(event.target.value)}
                    type={isPasswordHidden ? "password" : "text"}
                    placeholder="******"
                    className="w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* địa chỉ */}
          <div className="form-group mb-3">
            <label
              for="address"
              className="block py-2 text-gray-600 font-bold"
            >
              Địa Chỉ
            </label>
            <div className="relative text-gray-500">
              <input
                value={address}
                onChange={event => addresschange(event.target.value)}
                type="text"
                placeholder="118 Lê Cao Lãng, Phú Thạnh, Tân Phú"
                id="address"
                className=" w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="bg-yellow-500 text-black hover:bg-black hover:text-yellow-500 transition-all duration-300 font-bold"
            >
              Đăng Ký
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
