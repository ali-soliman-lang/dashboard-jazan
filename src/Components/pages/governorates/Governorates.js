import React, { useEffect, useState } from "react";
import "./Governorates.css";
import TableBody from "./TableBody/TableBody";

const Governorates = () => {
  const [goverment, setGoverment] = useState([]);
  const [govSend, setGovSend] = useState([]);
  const [token, setToken] = useState("");

  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    console.log(login.token);
    setToken(login.token);

    const data = fetch("https://marsad.almofawter.net/api/Governorates")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setGoverment([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = () => {
    const gov = [];

    setGoverment([
      ...goverment,
      {
        id: !goverment[goverment.length - 1].id
          ? 1
          : goverment[goverment.length - 1].id + 1,
        name: "",
        edit: true,
      },
    ]);
  };

  const handleSend = () => {
    govSend.forEach((gov) => {
      console.log(`https://marsad.almofawter.net/api/Governorates/${gov.id}`);
      const send = fetch(
        `https://marsad.almofawter.net/api/Governorates/${gov.id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: gov.name }),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
          const send = fetch(`https://marsad.almofawter.net/api/Governorates`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: gov.name }),
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
      <h2>محافظات</h2>
      <table className="table  table-centers">
        {/* table-striped */}
        <thead>
          <tr>
            <th scope="col">رقم محافظة</th>
            <th scope="col">اسم محافظة</th>
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

export default Governorates;
