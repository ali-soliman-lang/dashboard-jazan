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
  const handleEdit = () => {
    setEdit(true);
  };

  const handleshow = () => {
    const newGov = goverments.map((gov) => {
      if (gov.id === goverment.id) gov.name = input.current.value;

      return gov;
    });

    setGoverment(newGov);
    setEdit(false);
    setBtnDisabled(true);
    setGovSend([...govSend, { id: goverment.id, name: input.current.value }]);
  };

  const handleDelete = () => {
    const deleteIndex = fetch(
      `https://marsad.almofawter.net/api/Governorates/${goverment.id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      }
    )
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
