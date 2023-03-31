import React, { useState, useEffect } from "react";

const TableBody = () => {
  const [user, setUser] = useState([]);

  const fetchData = () => {
    fetch("/api/contacts")
      .then((response) => {
        if (response) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((err) => console.log("Error ==>" + err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <tbody className="table-group-divider">
        {user.map((data) => (
          <tr key={data.id}>
            <td>{data.id + 1}</td>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>
              {data.firstName.slice(0, 1) + "." + data.lastName + "@axelor.com"}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
