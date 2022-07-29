import React, { useEffect, useState } from "react";
import "./VisitorInquiries";

const VisitorInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    setToken(login.token);
    const contactsFun = async () => {
      const data = await fetch("https://marsad.almofawter.net/api/Contacts", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      setContacts(res.data);
    };
    contactsFun();
  }, [token]);
  return (
    <div className="container mt-5">
      <div className="row">
        {!contacts.length ? (
          <p>لا يوجد استفسارات</p>
        ) : (
          contacts.map((contactItem, ind) => (
            <div className="col-12 col-md-4 " key={ind}>
              <div className=" border border-2 p-3 ">
                <p className="text-center">رقم: {contactItem.id}</p>
                <p>الاسم: {contactItem.name}</p>
                <p>الايميل: {contactItem.email}</p>
                <p>رقم الهاتف: {contactItem.phone}</p>
                <p>الاستفسار: {contactItem.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VisitorInquiries;
