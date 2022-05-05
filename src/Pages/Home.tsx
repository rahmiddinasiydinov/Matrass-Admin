import { useEffect, useState } from 'react';
import './Pages.scss';
import { Switch } from "@mui/material";
interface Iorder{
    amount: number, 
    id: number,
    productId: number, 
    createdAt: string,
    name: string,
    phone_number: string, 
    updatedAt:string
 }
export const Home: React.FC = () => {
    const [oreders, setOreders] =useState<Iorder[]|null>(null)
    useEffect(() => {
        fetch("https://matrassesapp.herokuapp.com/api/order")
            .then(res => res.json()
                .then(data => {
                setOreders(data)
            }));
    }, [])
    return (
      <div className='table__wrapper'>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th className="table-head">ID</th>
              <th className="table-head">Ismi</th>
              <th className="table-head">Telefon raqami</th>
              <th className="table-head">Mahsulot nomlari</th>
              <th className="table-head">Miqdor</th>
              <th className="table-head">Qayta Aloqa</th>
            </tr>
          </thead>
          <tbody className='table-body'>
                    {oreders?.map((e, i) => {
               return (
                 <tr key={i}>
                   <td className="table-data">{e.id}</td>
                   <td className="table-data">{e.name}</td>
                   <td className="table-data">{e.phone_number}</td>
                   <td className="table-data">{'name'}</td>
                   <td className="table-data">{e.productId}</td>
                       <td className="table-data">
                           <Switch size='medium' defaultChecked={true} color='success'/>
                       </td>
                 </tr>
               );
           })}
          </tbody>
        </table>
      </div>
    );
} 