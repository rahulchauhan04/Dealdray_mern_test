import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyerRegistrations = () => {
  const [buyers, setBuyers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBuyers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `/sub-users/buyer-registrations?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBuyers(response.data.buyers);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching buyer registrations:', error);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, [page]);

  return (
    <div>
      <h1>Buyer Registrations</h1>
      {/* Render buyer registrations */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Registration Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer) => (
            <tr key={buyer._id}>
              <td>{buyer.name}</td>
              <td>{buyer.email}</td>
              <td>{buyer.mobile}</td>
              <td>{new Date(buyer.registrationDate).toLocaleDateString()}</td>
              <td>{buyer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BuyerRegistrations;
