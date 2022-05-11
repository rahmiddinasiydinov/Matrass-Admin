import * as React from "react";
import './ProductModal.scss'
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ReactComponent as Exit } from '../../Assets/Images/exit.svg';
import { ReactComponent as Image } from '../../Assets/Images/Image.svg';
import {ReactComponent as Check} from "../../Assets/Images/check.svg";
import {ReactComponent as Uncheck } from '../../Assets/Images/uncheck.svg';
import { Switch } from '@mui/material';
import axios from 'axios';
interface Imodal{
    open: boolean, 
  handleClose: () => void,
  handleToggle:() => void
}
 interface Icategory {
   model: string;
   isActive: boolean;
   isDelete: boolean;
   createdAt: string;
   updatedAt: string;
   id: number;
 }
interface InewProduct {
  capacity: string;
  categoryId: number;
  description: string;
  discount_price: number;
  img: string;
  isDiscount: boolean;
  isNew: boolean;
  price: number;
  size: string;
  title: string;
  warranty: number;
  yuklama: number;
}
export const ProductModel: React.FC<Imodal> = ({ open, handleClose, handleToggle }) => {
    const [category, setCategory] = React.useState<Icategory[] | null>(null)
    const [discount, setDiscount] = React.useState<boolean>(false);
    const [isnew, setNew] = React.useState<boolean>(true);
    const [active, setActive] = React.useState<boolean>(true);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<string>(
    "Successfully accepted!"
  );
     React.useEffect(() => {
       fetch("https://matrassesapp.herokuapp.com/api/category")
         .then((res) => res.json())
           .then((data) => {
               if (data) {
                   setCategory(data);
             }
         });
     }, [toggle]);
  const text = React.useRef < HTMLParagraphElement | null>(null)
    //submitting form
    const handleSubmit = (e: any): void => {
        e.preventDefault();
        const { img, categoryId, title, price, yuklama, size, warranty, capacity, discount_price, description } = e.target.elements;
       
  
      
        const formData = new FormData();
        formData.append('categoryId', categoryId.value);
        formData.append("capacity", capacity.value);
        formData.append("description", description.value);
        formData.append("img", img.files);
        formData.append("isNew", String(isnew));
        formData.append("warranty", warranty.value);
        formData.append("yuklama", yuklama.value);
        formData.append("title", title.value);
        formData.append("size", size.value);
        formData.append("price", price.value);
        formData.append("isDiscount", String(discount));
        formData.append("discount_price", discount ? discount_price.value : price.value);
        
      axios({
        method: "POST", 
        url: "https://matrassesapp.herokuapp.com/api/product", 
        data:formData
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          setToggle(!toggle)
          text.current?.classList.add('promodal__text--active');
          handleToggle()
          setTimeout(() => {
          text.current?.classList.remove("promodal__text--active");
          }, 5000)
        } else {
           text.current?.classList.add("promodal__text--error");
           setTimeout(() => {
             text.current?.classList.remove("promodal__text--error");
           }, 5000);
        }
      }
      );
    
   
    }
  
    
  
    
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="promodal">
            <p className="promodal__text" ref={text}>{ response}</p>
            <button className="promodal__exit" onClick={handleClose}>
              <Exit />
            </button>
            <h2 className="promodal__title">Qo'shish</h2>
            <form
              action="https://matrassesapp.herokuapp.com/api/product"
              className="promodal__form"
              encType="multipart/form-data"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="promodal__section">
                <label htmlFor="img" className="promodal__label--img">
                  <Image />
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  className="promodal__input--img"
                  placeholder="image"
                />
              </div>
              <div className="promodal__section">
                <label htmlFor="category" className="promodal__label">
                  Toifalar
                </label>
                <select
                  name="categoryId"
                  className="promodal__input"
                  id="category"
                >
                  {category?.map((e: Icategory, i: number) => {
                    return <option value={e.id}>{e.model}</option>;
                  })}
                </select>
                <label htmlFor="name" className="promodal__label">
                  Tovar nomi
                </label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  className="promodal__input"
                  placeholder="masalan: Lux Soft Memory"
                />
                <label htmlFor="price" className="promodal__label">
                  Narxi
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="promodal__input"
                  placeholder="masalan: 100000000"
                />
                <label htmlFor="yuklama" className="promodal__label">
                  Yuklama
                </label>
                <input
                  type="number"
                  name="yuklama"
                  id="yuklama"
                  className="promodal__input"
                  placeholder="masalan: 200kg"
                />
              </div>
              <div className="promodal__section">
                <label htmlFor="size" className="promodal__label">
                  Razmeri
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  className="promodal__input"
                  placeholder="masalan: 220x120x40"
                />
                <label htmlFor="gauranty" className="promodal__label">
                  kafolat (yil)
                </label>
                <input
                  type="number"
                  name="warranty"
                  id="gauranty"
                  className="promodal__input"
                  placeholder="masalan: 3"
                />
                <label htmlFor="capacity" className="promodal__label">
                  Sig’imi(odam soni)
                </label>
                <input
                  type="text"
                  name="capacity"
                  id="capacity"
                  className="promodal__input"
                  placeholder="masalan: 2 kishilik"
                />
                <label htmlFor="discount" className="promodal__label">
                  Aksiya narxi
                </label>
                <div className="promodal__input promodal__discount">
                  <input
                    type="number"
                    name="discount_price"
                    id="discount"
                    placeholder="masalan: 12000000"
                    className="promodal__discount--input"
                    onChange={(e) => {
                      if (e.target.value.length) {
                        setDiscount(true);
                      } else {
                        setDiscount(false);
                      }
                    }}
                  />
                  <span
                    className={`promodal__discount--icon ${
                      discount ? "promodal__discount--active" : ""
                    }`}
                  >
                    {discount ? <Check /> : <Uncheck />}
                  </span>
                </div>
              </div>{" "}
              <div className="promodal__section">
                <label htmlFor="info" className="promodal__label">
                  Ma'lumot
                </label>
                <textarea
                  name="description"
                  id="info"
                  className="promodal__textarea"
                ></textarea>

                <label className="promodal__label promodal__switch">
                  Yangi
                  <Switch
                    size="medium"
                    defaultChecked={isnew}
                    color="success"
                    onChange={() => {
                      setNew(!isnew);
                    }}
                  />
                </label>

                <label className="promodal__label promodal__switch">
                  Active
                  <Switch
                    size="medium"
                    defaultChecked={active}
                    color="success"
                    onChange={() => {
                      setActive(!active);
                    }}
                  />
                </label>
                <button className="promodal__submit" type="submit">
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
