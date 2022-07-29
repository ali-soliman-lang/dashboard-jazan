import React, { useEffect, useState } from "react";
import "./MapCities.css";
import TableBody from "./TableBody/TableBody";

const MapCities = () => {
  const [goverment, setGoverment] = useState([]);
  const [govSend, setGovSend] = useState([]);

  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    const data = fetch("https://marsad.almofawter.net/api/MapCities")
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

    setGoverment([
      ...goverment,
      {
        id: !goverment[goverment.length - 1].id
          ? 1
          : goverment[goverment.length - 1].id + 1,
        name: "",
        agricultural: "",
        industrial: "",
        residential: "",
        commercial: "",
        other: "",
        edit: true,
      },
    ]);
  };

  const handleSend = () => {
    govSend.forEach((gov) => {
      const send = fetch(
        `https://marsad.almofawter.net/api/MapCities/${gov.id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: gov.name,
            agricultural: gov.agricultural,
            industrial: gov.industrial,
            residential: gov.residential,
            commercial: gov.commercial,
            other: gov.other,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => {
          const send = fetch(`https://marsad.almofawter.net/api/MapCities`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: gov.name,
              agricultural: gov.agricultural,
              industrial: gov.industrial,
              residential: gov.residential,
              commercial: gov.commercial,
              other: gov.other,
            }),
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
      <h2>خريطة جازان</h2>
      <table className="table  table-centers">
        <thead>
          <tr>
            <th scope="col">رقم مدينة</th>
            <th scope="col">اسم مدينة</th>
            <th scope="col">زراعى</th>
            <th scope="col">صناعي</th>
            <th scope="col">سكني</th>
            <th scope="col">تجاري</th>
            <th scope="col">اخري</th>
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

export default MapCities;
