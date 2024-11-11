import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CUSTOMER_ADDRESS_UPDATE } from './mutations';

const UpdateAddressForm: React.FC = () => {
  const [customerAccessToken, setCustomerAccessToken] = useState('');
  const [addressId, setAddressId] = useState('');
  const [address, setAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    firstName: '',
    lastName: '',
    phone: '',
    province: '',
    zip: '',
  });

  const [updateAddress, { data, loading, error }] = useMutation(CUSTOMER_ADDRESS_UPDATE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAddress({
      variables: {
        customerAccessToken,
        id: addressId,
        address,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Access Token"
        value={customerAccessToken}
        onChange={(e) => setCustomerAccessToken(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address ID"
        value={addressId}
        onChange={(e) => setAddressId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address 1"
        value={address.address1}
        onChange={(e) => setAddress({ ...address, address1: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address 2"
        value={address.address2}
        onChange={(e) => setAddress({ ...address, address2: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company"
        value={address.company}
        onChange={(e) => setAddress({ ...address, company: e.target.value })}
      />
      <input
        type="text"
        placeholder="Country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
      />
      <input
        type="text"
        placeholder="First Name"
        value={address.firstName}
        onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={address.lastName}
        onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={address.phone}
        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Province"
        value={address.province}
        onChange={(e) => setAddress({ ...address, province: e.target.value })}
      />
      <input
        type="text"
        placeholder="ZIP"
        value={address.zip}
        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
      />
      <button type="submit">Update Address</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Address updated successfully!</p>}
    </form>
  );
};

export default UpdateAddressForm;