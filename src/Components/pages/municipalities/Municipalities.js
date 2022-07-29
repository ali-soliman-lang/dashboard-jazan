import React, { useEffect, useState } from "react";
import "./Municipalities.css";
import TableBody from "./TableBody/TableBody";

const Municipalities = () => {
  const [goverment, setGoverment] = useState([]);
  const [govSend, setGovSend] = useState([]);

  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    const data = fetch("https://marsad.almofawter.net/api/Municipalities")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setGoverment([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  //   useEffect(() => {
  //     setBtnDisabled(!btnDisabled);
  //   }, [goverment]);

  const handleAdd = () => {
    const gov = [];

    console.log(goverment);
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
      console.log(`https://marsad.almofawter.net/api/Municipalities/${gov.id}`);
      const send = fetch(
        `https://marsad.almofawter.net/api/Municipalities/${gov.id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name: gov.name }),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
          const send = fetch(
            `https://marsad.almofawter.net/api/Municipalities`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ name: gov.name }),
            }
          )
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
      <h2>البلديات</h2>
      <table className="table  table-centers">
        {/* table-striped */}
        <thead>
          <tr>
            <th scope="col">رقم البلديات</th>
            <th scope="col">اسم البلديات</th>
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
              inputEdit={gov.edit}
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

export default Municipalities;
