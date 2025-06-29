import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want delete this user?")){
            return
        }
        axiosClient.delete(`/users/${u.id}`)
        .then(() => {
            getUsers()
        })
    }
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        setError(null);
        
        // تغییر endpoint به '/users' به جای '/user'
        axiosClient.get('/users')
            .then(({ data }) => {
                console.log("Data received:", data); // برای دیباگ
                
                // بررسی ساختارهای مختلف پاسخ
                const usersData = data.data || data.users || data;
                
                if (Array.isArray(usersData)) {
                    setUsers(usersData);
                } else {
                    console.error("Received data is not an array:", usersData);
                    setUsers([]);
                    setError("Invalid data format received");
                }
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Failed to load users");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">Add New</Link>
            </div>

            {loading && <p>Loading users...</p>}
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            {!loading && !error && users.length === 0 && (
                <div className="alert alert-info">No users found</div>
            )}

            {!loading && !error && users.length > 0 && (
                <div className="card animated fadeInDown">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading && <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">

                                </td>
                            </tr>
                        </tbody>} 
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/users/${user.id}`} className="btn-edit">Edit</Link>
                                        &nbsp;
                                        <button onClick={ev =>onDelete(user)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}