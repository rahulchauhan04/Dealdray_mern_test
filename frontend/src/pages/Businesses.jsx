import React, { useEffect, useState } from "react";
import API from "../services/api";

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await API.get("/businesses");
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div>
      <h1>Businesses</h1>
      {businesses.length > 0 ? (
        <ul>
          {businesses.map((business) => (
            <li key={business._id}>
              {business.name} - {business.ownerName} ({business.category})
            </li>
          ))}
        </ul>
      ) : (
        <p>No businesses found</p>
      )}
    </div>
  );
};

export default Businesses;
