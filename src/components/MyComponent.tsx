// src/components/MyComponent.tsx
import React from 'react';

const MyComponent: React.FC = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
};

export default MyComponent;

// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import YourComponent from '@components/YourComponent';

const App: React.FC = () => {
  return (
    <div>
      <YourComponent />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
