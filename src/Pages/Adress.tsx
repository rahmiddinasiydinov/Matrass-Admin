import { useEffect, useState } from "react";
import "./Pages.scss";
import { ReactComponent as Pen } from "../Assets/Images/pen.svg";
import { ReactComponent as Trash } from "../Assets/Images/trash.svg";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ProductModel } from "../Components/ProductModal/ProductModal";

interface Iadress {
  createdAt: string;
  id: number;
  img: string;
  intended: string;
  location: string;
  name: string;
  updatedAt: string;
}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Adress: React.FC = () => {
  const [adress, setAdress] = useState<Iadress[] | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);

  //Toggle Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  //   const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    fetch("https://matrassesapp.herokuapp.com/api/address").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setAdress(data);
      })
    );
  }, [toggle]);

  const handleDelete = (id: number) => {
    handleWarningClick();
    fetch("https://matrassesapp.herokuapp.com/api/address", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          handleWarningClose();
          setToggle(!toggle);
          handleClick();
        }
      })
      .catch((e: any) => {
        handleWarningClose();
        handleErrorClick();
      });
  };

  //snackbar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  //snackbar error
  const [erroropen, setErrorOpen] = React.useState(false);
  const handleErrorClick = () => {
    setErrorOpen(true);
  };
  const handleErrorClose = (event?: React.SyntheticEvent | Event) => {
    setErrorOpen(false);
  };
  //snackbar warning
  const [warningopen, setWarningOpen] = React.useState(false);
  const handleWarningClick = () => {
    setWarningOpen(true);
  };
  const handleWarningClose = (event?: React.SyntheticEvent | Event) => {
    setWarningOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Delelted successlully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={erroropen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error ocured!
        </Alert>
      </Snackbar>
      <Snackbar
        open={warningopen}
        autoHideDuration={6000}
        onClose={handleWarningClose}
      >
        <Alert
          onClose={handleWarningClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Sending...
        </Alert>
      </Snackbar>
      <div className="table__wrapper">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th className="table-head">ID </th>
              <th className="table-head">Manzil</th>
              <th className="table-head">Matn</th>
              <th className="table-head">Loaction</th>
              <th className="table-head"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {adress?.map((e, i) => {
              return (
                <tr key={i}>
                  <td className="table-data">{e.id}</td>
                  <td className="table-data">{e.name}</td>
                  <td className="table-data">{e.intended}</td>
                  <td className="table-data">{e.location}</td>
                  <td className="table-data">
                    <div className="model__btn--group">
                      <button className="model__btn model__btn--pen0">
                        <Pen />
                      </button>
                      <button
                        className="model__btn model__btn--trash"
                        onClick={() => {
                          handleDelete(e.id);
                        }}
                      >
                        <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="product__add">Qo'shish</button>
    </>
  );
};
