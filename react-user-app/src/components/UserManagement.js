import React, { useState, useEffect } from 'react';
import { User } from '../model/User';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const handleAddUser = (e) => {
        e.preventDefault();
        const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
        const newUser = new User(newId, name, age);

        fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then((data) => setUsers((prevUsers) => [...prevUsers, data]));

        setName('');
        setAge('');
    };

    const handleEditUser = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setEditingId(id);
        setName(userToEdit.name);
        setAge(userToEdit.age);
    };

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "DELETE",
        }).then(() => {
            setUsers(users.filter((user) => user.id !== id));
        });
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const updatedUser = new User(editingId, name, age);

        fetch(`http://localhost:8080/api/users/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
        .then((response) => response.json())
        .then((data) => {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editingId ? data : user
                )
            );
            setEditingId(null);
            setName('');
            setAge('');
        });
    };

    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={editingId ? handleUpdateUser : handleAddUser}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">{editingId ? "Update User" : "Add User"}</button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.age})
                        <button onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;
