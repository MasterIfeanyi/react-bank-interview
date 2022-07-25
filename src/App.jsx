import { Routes, Route, Navigate } from "react-router-dom"
import Layout from './Layout/Layout';
import RequireAuth from './features/auth/RequireAuth';
import Login from "./features/auth/Login";
import Register from "./features/register/Register";
import Home from "./Components/Home";
import Bank from "./features/account/Bank";
import History from "./features/History/History";
import Deposit from "./features/account/Deposit";
import Withdraw from "./features/account/Withdraw";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protected routes */}
        <Route element={<RequireAuth/>}>
          <Route path="account" element={<Bank />} />
          <Route path="history/:id" element={<History />} />
          <Route path="deposit/:id" element={<Deposit />} />
          <Route path="withdraw/:id" element={<Withdraw />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
