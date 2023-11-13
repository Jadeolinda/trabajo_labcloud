'use client';

import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';

import ReporteApi from '../../api/reporteProductos.js';
import './style.css'

export default function Reporte() {

    const router = useRouter();


    const [productos, setProductos] = useState([]);
    

    
    const handleOnLoad = async () => {

        const result = await ReporteApi.findAll();
        setProductos(result.data);
        console.log(productos);
    }
    
    useEffect(() => {
        handleOnLoad();
    }, []);

    return (
        
        <div className='contenedor'>
            <h1>
                Reporte de Productos
            </h1>
            <table>
            <tr>
                <th>Nombre de Producto</th>
                <th>Precio Total</th>
            </tr>
            <tbody>
            {
                productos.map((item, index)=>{
                    return (
                        <tr key={index}>
                            <td> {item.nombre} </td>
                            <td> {item.precio} </td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
        </div>    
    )
}