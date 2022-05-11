import { useEffect, useState } from "react";
import "./Pages.scss";
import { Switch } from "@mui/material";
import axios from "axios";
import {ReactComponent as Trash } from '../Assets/Images/trash.svg';
interface Icustomer {
  communication: boolean;
  id: number;
  date:string,
  createdAt: string;
  isDelete: boolean;
  phone_number: string;
  updatedAt: string;
}
export const Customer: React.FC = () => {
  const [customers, setCustomer] = useState<Icustomer[] | null>(null);
  useEffect(() => {
    fetch("https://matrassesapp.herokuapp.com/api/contact").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setCustomer(data)
      })
    );
  }, []);
  return (
    <div className="table__wrapper">
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th className="table-head">ID</th>
            <th className="table-head">Sana</th>
            <th className="table-head">Telefon raqami</th>
            <th className="table-head">Qayta aloqa</th>
            <th className="table-head"></th>
         
          </tr>
        </thead>
        <tbody className="table-body">
          {customers?.map((e, i) => {
            return (
              <tr key={i}>
                <td className="table-data">{e.id}</td>
                <td className="table-data">{e.date}</td>
                <td className="table-data">{e.phone_number}</td>
                <td className="table-data">
                  <Switch size="medium" defaultChecked={e.communication} color="success" onChange={() => {
                    axios({
                      method: "PUT",
                      url: "https://matrassesapp.herokuapp.com/api/contact",
                      data: {
                          communication: !e.communication,
                          id: e.id,
                          date:e.date,
                          createdAt: e.createdAt,
                          isDelete: e.isDelete,
                          phone_number: e.phone_number,
                          updatedAt: e.updatedAt
                      }
                    }).then(res => {
                      console.log(res);
                      
                    });
                  }}/>
                    </td>
                 <button className="model__btn model__btn--trash"
                        onClick={() => {
                        }}
                      >
                  <Trash />
                  </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
