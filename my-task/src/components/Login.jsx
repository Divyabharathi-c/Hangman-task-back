// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';

// const Login = ({ setToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       // const response = await axios.post('/auth/login', { username, password });
//       const response = await axios.post('/auth/login',{ username, password });
//       const { token } = response.data;
//       setToken(token);
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };




// export default Login;





import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { username, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
