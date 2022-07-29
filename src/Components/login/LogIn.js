import React, { useRef } from "react";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";

// const LogIn = () => {
//     return(
//         <div className="login-page">
//             <main className="form-signin m-auto">
//             <form>
//                 <h1>لوحة التحكم للجازان</h1>
//                 <div className="form-floating">
//                 <input type="email" className="form-control" id="floatingInput" placeholder="اسم المستخدم" />
//                 <label htmlFor="floatingInput">اسم المستخدم</label>
//                 </div>
//                 <div className="form-floating">
//                 <input type="password" className="form-control" id="floatingPassword" placeholder="كلمة السر" />
//                 <label htmlFor="floatingPassword">كلمة السر</label>
//                 </div>
//                 <Link to="/dashboard" className="w-100 btn btn-lg btn-primary" type="submit">تسجيل الدخول</Link>
//             </form>
//             </main>
//         </div>
//     );
// }

// const inputs = document.querySelectorAll(".login-content .input");

// function addcl() {
//   let parent = this.parentNode.parentNode;
//   parent.classList.add("focus");
// }

// function remcl() {
//   let parent = this.parentNode.parentNode;
//   if (this.value === "") {
//     parent.classList.remove("focus");
//   }
// }

// inputs.forEach((input) => {
//   input.addEventListener("focus", addcl);
//   input.addEventListener("blur", remcl);
// });

const handleInputFocus = (e) => {
  e.target.parentNode.parentNode.classList.add("focus");
};

const handleInputBlur = (e) => {
  e.target.parentNode.parentNode.classList.remove("focus");
};
const LogIn = () => {
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const sumbitHandler = (e) => {
    e.preventDefault();
    const login = async () => {
      const res = await fetch(
        `https://marsad.almofawter.net/api/Users/Login?Email=${username.current.value}&Password=${password.current.value}`
      );

      const { data } = await res.json();

      localStorage.setItem("login", JSON.stringify(data));
      navigate("/dashboard");
      console.log(data);
    };
    login();
  };
  return (
    <div>
      <div className="login-content">
        <form onSubmit={sumbitHandler}>
          <h2 className="title">لوحة التحكم للجازان</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <h5>اسم المستخدم</h5>
              <input
                type="text"
                className="input"
                onFocus={handleInputFocus.bind(this)}
                onBlur={handleInputBlur.bind(this)}
                ref={username}
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <h5>كلمة السر</h5>
              <input
                type="password"
                className="input"
                onFocus={handleInputFocus.bind(this)}
                onBlur={handleInputBlur.bind(this)}
                ref={password}
              />
            </div>
          </div>
          <p>
            <input type="submit" className="btn" value="تسجيل الدخول" />
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
