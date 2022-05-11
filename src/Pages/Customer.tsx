import * as React from 'react'
import { useEffect, useState } from "react";
import "./Pages.scss";
import { Switch } from "@mui/material";
import axios from "axios";
import { ReactComponent as Trash } from '../Assets/Images/trash.svg';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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
  const [toggle, setToggle] = useState<boolean>(false)
  useEffect(() => {
    fetch("https://matrassesapp.herokuapp.com/api/contact").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setCustomer(data)
      })
    );
  }, [toggle]);


  //snackbar
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Deleted succesfully!
        </Alert>
      </Snackbar>
    <div className="table__wrapper">
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th className="table-head">ID</th>
            <th className="table-head">Sana</th>
            <th className="table-head">Telefon raqami</th>
            <th className="table-head">Qayta aloqa</th>
            <th className="table-head">O'chirish</th>
         
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
                  <Switch
                    size="medium"
                    defaultChecked={e.communication}
                    color="success"
                    onChange={() => {
                      axios({
                        method: "PUT",
                        url: "https://matrassesapp.herokuapp.com/api/contact",
                        data: {
                          communication: !e.communication,
                          id: e.id,
                          date: e.date,
                          createdAt: e.createdAt,
                          isDelete: e.isDelete,
                          phone_number: e.phone_number,
                          updatedAt: e.updatedAt,
                        },
                      }).then((res) => {
                        console.log(res);
                      });
                    }}
                  />
                </td>
                <td>
                  <button
                    className="model__btn model__btn--trash"
                    onClick={() => {
                        axios({
                          method:"DELETE",
                          url: "https://matrassesapp.herokuapp.com/api/contact",
                          data: {
                            id:e.id
                          }
                        }).then(res => {
                          console.log(res);
                          handleClick();
                          setToggle(!toggle);
                          
                        });
                    }}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      </Stack>
  );
};
