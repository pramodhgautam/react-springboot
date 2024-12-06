import React, { useState, useEffect } from 'react';
import { Product } from '../model/Product';  // Assuming you have this model.

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newId = products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;
        const newProduct = new Product(newId, name, price);

        fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        })
        .then((response) => response.json())
        .then((data) => setProducts((prevProducts) => [...prevProducts, data]));

        setName('');
        setPrice('');
    };

    const handleEditProduct = (id) => {
        const productToEdit = products.find((product) => product.id === id);
        setEditingId(id);
        setName(productToEdit.name);
        setPrice(productToEdit.price);
    };

    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:8080/api/products/${id}`, {
            method: "DELETE",
        }).then(() => {
            setProducts(products.filter((product) => product.id !== id));
        });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const updatedProduct = new Product(editingId, name, price);

        fetch(`http://localhost:8080/api/products/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        })
        .then((response) => response.json())
        .then((data) => {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === editingId ? data : product
                )
            );
            setEditingId(null);
            setName('');
            setPrice('');
        });
    };

    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={editingId ? handleUpdateProduct : handleAddProduct}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
            </form>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} ({product.price})
                        <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductManagement;
