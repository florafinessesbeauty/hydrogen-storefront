import React from 'react';
import { Helmet } from 'react-helmet';

const MyComponent = () => (
  <div>
    <Helmet>
      <title>My Page Title</title>
      <meta name="description" content="My Page Description" />
    </Helmet>
    <h1>Welcome to My Page</h1>
  </div>
);

export default MyComponent;
