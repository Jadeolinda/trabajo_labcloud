'use client';

import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation';

import RegistroApi from '../../api/registrarProducto.js';
import ReporteApi from '../../api/reporteProductos.js';

import './style.css'

export default function Registro() {

    const router = useRouter();

    const [productos, setProductos] = useState([]);

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    
    
    const handleOnLoad = async () => {

        const result = await ReporteApi.findAll();
        setProductos(result.data);
        console.log(productos);
    }
    
    useEffect(() => {
        handleOnLoad();
    }, []);


    const handleClickReporte = () =>{
        router.push('/reporte')
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const nombreEnMinusculas = nombre.toLowerCase();
        const productoExistente = productos.find(producto => producto.nombre.toLowerCase() === nombreEnMinusculas);

        if(productoExistente){
            productoExistente.precio =+ precio;
            const result = await ReporteApi.update(productoExistente);
        }else{
            let ids = []
            for (let i = 0; i < productos.length; i++){
                ids.push(productos[i].id)
            }
            const id = Math.max(...ids)+1
            
        // Objeto con los datos del nuevo producto
        const producto = {
            id: id,
            nombre: nombre,
            precio: precio
          };
     
          console.log(producto);
     
          
          try {
            // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
            const response = await RegistroApi.create(producto);
      
            // Comprueba el resultado de la solicitud
            if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              alert('Registro exitoso!');
              router.push('/');
            } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              alert('Error al registrar producto');
            }
          } catch (error) {
            // Manejo de errores en caso de problemas de conexión o errores en el backend
            alert('Error al registrar producto');
          }
        };
        }

        
    
    return (
        
        <div className='contenedor'>
            <div className='cont2'>
                <h1>
                    Registro de Compras de Productos
                </h1>
                <form onSubmit={submitForm} method="post">
                    <div className='placeholders'>
                        <input className="caja" type="text" value={ nombre } 
                                    onChange={e => setNombre(e.target.value)}
                                    required placeholder="Nombre de Producto"></input>
                        <input className="caja" type="number" value={ precio } 
                                    onChange={e => setPrecio(e.target.value)}
                                    required placeholder="Precio"></input>
                    </div>
                    <br></br><br></br>
                    <div className='boton'>
                        <input type="submit" value="Guardar"></input>
                        <input type="button" value="Reporte" onClick={handleClickReporte}></input>
                    </div>

                </form>

            </div>
            
        </div>     
    )
}