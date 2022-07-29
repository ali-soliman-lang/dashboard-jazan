import React, { useRef, useState } from "react";

function TableBody({
  goverment,
  setGoverment,
  goverments,
  setBtnDisabled,
  setGovSend,
  govSend,
  editInput,
}) {
  const [edit, setEdit] = useState(editInput);
  const input = useRef(null);
  const inputAgricultural = useRef(null);
  const inputIndustrial = useRef(null);
  const inputResidential = useRef(null);
  const inputCommercial = useRef(null);
  const inputOther = useRef(null);
  const handleEdit = () => {
    setEdit(true);
  };

  const handleshow = () => {
    const newGov = goverments.map((gov) => {
      if (gov.id === goverment.id) {
        gov.name = input.current.value;
        gov.agricultural = inputAgricultural.current.value;
        gov.industrial = inputIndustrial.current.value;
        gov.commercial = inputCommercial.current.value;
        gov.residential = inputResidential.current.value;
        gov.other = inputOther.current.value;
      }

      return gov;
    });

    setGoverment(newGov);
    setEdit(false);
    setBtnDisabled(true);
    setGovSend([
      ...govSend,
      {
        id: goverment.id,
        name: input.current.value,
        agricultural: inputAgricultural.current.value,
        industrial: inputIndustrial.current.value,
        residential: inputResidential.current.value,
        commercial: inputCommercial.current.value,
        other: inputOther.current.value,
      },
    ]);
  };

  const handleDelete = () => {
    fetch(`https://marsad.almofawter.net/api/MapCities/${goverment.id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <tr>
      <th scope="row">
        {
          /* {edit ? (
          <input type={"text"} defaultValue={goverment.id + 1} />
        ) : (
          goverment.id + 1
        )} */
          goverment.id
        }
      </th>
      <td>
        {edit || !goverment.name ? (
          <input type={"text"} defaultValue={goverment.name} ref={input} />
        ) : (
          goverment.name
        )}
      </td>
      <td>
        {edit || !goverment.name ? (
          <input
            type={"number"}
            defaultValue={goverment.agricultural}
            ref={inputAgricultural}
          />
        ) : (
          goverment.agricultural
        )}
      </td>
      <td>
        {edit || !goverment.name ? (
          <input
            type={"number"}
            defaultValue={goverment.industrial}
            ref={inputIndustrial}
          />
        ) : (
          goverment.industrial
        )}
      </td>
      <td>
        {edit || !goverment.name ? (
          <input
            type={"number"}
            defaultValue={goverment.residential}
            ref={inputResidential}
          />
        ) : (
          goverment.residential
        )}
      </td>
      <td>
        {edit || !goverment.name ? (
          <input
            type={"number"}
            defaultValue={goverment.commercial}
            ref={inputCommercial}
          />
        ) : (
          goverment.commercial
        )}
      </td>
      <td>
        {edit || !goverment.name ? (
          <input
            type={"number"}
            defaultValue={goverment.other}
            ref={inputOther}
          />
        ) : (
          goverment.other
        )}
      </td>
      <td className="icons-edits">
        <ul className="d-flex justify-content-center gap-3 mb-0">
          <li>
            <button
              className={`btn ${edit ? "disabled" : null}`}
              onClick={() => handleEdit()}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </li>
          <li>
            <button
              className={`btn ${!edit ? "disabled" : null}`}
              onClick={() => handleshow()}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => handleDelete()}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default TableBody;
