import "./UsersPanel.css";

import React, { useEffect, useState } from "react";
import TableBody from "./TableBody/TableBody";
const UsersPanel = () => {
  const [goverment, setGoverment] = useState([]);
  const [govSend, setGovSend] = useState([]);
  const [token, setToken] = useState("");

  const [btnDisabled, setBtnDisabled] = useState(false);
  useEffect(()=>{
      const login = JSON.parse(localStorage.getItem("login"));
      setToken(login.token);
  },[])
  useEffect(() => {
      
      const data = fetch("https://marsad.almofawter.net/api/Users", {
          method: "GET",
          headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
        return res.json();
      })
      .then((res) => {
        setGoverment([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleAdd = () => {
    const gov = [];

    setGoverment([
      ...goverment,
      {
        id: !goverment[goverment.length - 1].id
          ? 1
          : goverment[goverment.length - 1].id + 1,
        name: "",
        password:"",
        email:"",
        phone:"",
        edit: true,
      },
    ]);
  };

  const handleSend = () => {
    govSend.forEach((gov) => {
      console.log(`https://marsad.almofawter.net/api/Users/${gov.id}`);
      const send = fetch(`https://marsad.almofawter.net/api/Users/${gov.id}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: gov.name, password:gov.password,email: gov.email,phone:gov.phone }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
          const send = fetch(`https://marsad.almofawter.net/api/Users`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: gov.name,password:gov.password,  email: gov.email, phone:gov.phone }),
          })
            .then((res) => res.json())
            .then((data) => console.log("post"))
            .catch((err) => {
              console.log(err);
            });
        });
    });

    setBtnDisabled(false);
    setGovSend([]);
  };

  return (
    <div>
      <h2>المستخدمين</h2>
      <table className="table  table-centers">
        {/* table-striped */}
        <thead>
          <tr>
            <th scope="col">رقم المستخدم</th>
            <th scope="col">اسم</th>
            <th scope="col">كلمة السر</th>
            <th scope="col">الايميل</th>
            <th scope="col">التليفون</th>
            <th scope="col" className="icons-edits">
              <ul>
                <li>
                  <button className="btn" onClick={() => handleAdd()}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </li>
              </ul>
            </th>
          </tr>
        </thead>
        <tbody>
          {goverment.map((gov, ind) => (
            <TableBody
              goverment={gov}
              key={ind}
              setGoverment={setGoverment}
              goverments={goverment}
              setBtnDisabled={setBtnDisabled}
              setGovSend={setGovSend}
              govSend={govSend}
              editInput={gov.edit}
            />
          ))}
        </tbody>
      </table>
      <button
        className={`btn btn-success d-block ms-auto ${
          !govSend.length ? "disabled" : null
        }`}
        onClick={() => handleSend()}
      >
        حفظ التعديلات
      </button>
    </div>
  );
};

export default UsersPanel;
