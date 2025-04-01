import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/ShoppingCartContext'

const ProductsDetails = () => {
    const { products, upperCase } = useContext(ProductsContext)
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const {addToCart} = useContext(CartContext)

    useEffect(() => {
        const foundProduct = products.find(product => product.id === id)
        setProduct(foundProduct)
    }, [products, id])

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    };

    if (!product) {
        return <div>Cargando...</div>
    }

    return (
        <div key={product.id} style={{margin: "2rem", display: "flex", marginTop: "76px"}}>
            <div style={{marginRight: "1rem"}}>
                <img src={product.imagen} alt={product.nombre}/>
            </div>
            <div>
                <h2>{upperCase(product.nombre)}</h2>
                <hr></hr>
                <p>{product.descripcion}</p>
                <p className="card-text"><b>Ingredientes:</b></p>
                <ul>
                    {product.ingredientes.map((ingredient, index) => (
                        <li key={index}>🍕 {upperCase(ingredient)}</li>
                    ))}
                </ul>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <h4>Precio: ${formatPrice(product.precio)}</h4>
                <button className="btn btn-danger" onClick={() => addToCart(product.id, product.precio)}>Añadir 🛒</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsDetails

