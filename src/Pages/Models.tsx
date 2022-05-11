import { useEffect, useState } from "react";
import "./Pages.scss";
import {ReactComponent as Pen} from '../Assets/Images/pen.svg';
import { ReactComponent as Trash } from "../Assets/Images/trash.svg";
import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Switch } from "@mui/material";
import {ReactComponent as Exit} from  '../Assets/Images/exit.svg'
import axios from 'axios';

interface Imodel {
  id: number;
  isActive:boolean, 
  isDelete:boolean,
  model:string
  createdAt: string;
    updatedAt: string;
    



}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Model: React.FC = () => {
  const [model, setModel] = useState<Imodel[] | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    fetch("https://matrassesapp.herokuapp.com/api/category").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setModel(data);
      })
    );
  }, [toggle]);

    const handleDelete = (id: number) => {
      handleWarningClick()
    fetch("https://matrassesapp.herokuapp.com/api/category", {
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
          handleWarningClose()
          setToggle(!toggle);
          handleClick();
        }
      })
      .catch((e: any) => {
          handleWarningClose();
          setToggle(!toggle)
          handleClick();
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

   const [openModal, setOpenModal] = React.useState(false);
   const handleOpenModal = () => setOpenModal(true);
   const handleCloseModal = () => setOpenModal(false);
  const [state, setState] = useState<boolean>(true);
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const { category } = e.target.elements;
    console.log(category.value);
    axios.post(
       "https://matrassesapp.herokuapp.com/api/category",{
           isActive:state, 
           model:category.value
      }
    ).then(res => {
      console.log(res);
      setToggle(!toggle);
      
    });
    
   }
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="category">
           <span className="category__exit" onClick={handleCloseModal}><Exit/></span>
          <h2 className="category__title">Qo'shish</h2>
          <form action="" className="category__form" onSubmit={handleSubmit}>
            <label htmlFor="" className="category__label">
              Kategoriya nomi
            </label>
            <input
              type="text"
              className="category__input"
              placeholder="masalan: Model B"
              name='category'
            />
            <div className="category__state">
              Holat{" "}
              <Switch
                size="medium"
                defaultChecked={state}
                color="success"
                onChange={() => setState(!state)}
              />
            </div>
            <button className="category__btn">Qo'shish</button>
          </form>
        </div>
      </Modal>{" "}
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
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: "100%" }}>
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
              <th className="table-head">Toifalar</th>
              <th className="table-head"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {model?.map((e, i) => {
              return (
                <tr>
                  <td className="table-data">{e.id}</td>
                  <td className="table-data">{e.model}</td>
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
      <button onClick={handleOpenModal} className="product__add">
        Qo'shish
      </button>
    </>
  );
};
