import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Books from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import Basket from "./pages/BasketPage";
import Footer from "./components/Footer";
import HeaderInfo from "./components/HeaderInfo";
import "./App.css";
import { AppContextProvider } from "./components/AppContext";
// import { RestrictedRoute } from "./components/RestrictedRoute";
import RequireAuth from "./components/RequireAuth";

import { Layout } from "antd";

function App() {
  return (
    <AppContextProvider>
      <Layout className="layout">
        <HeaderInfo />
        <div className="container">
          <Routes basename="/X-course-task">
            <Route path="/X-course-task/" element={<Login />} />
            <Route
              path="/X-course-task/books"
              element={
                <RequireAuth>
                  <Books />
                </RequireAuth>
              }
            />
            <Route
              path="/X-course-task/book/:id"
              element={
                <RequireAuth>
                  <BookPage />
                </RequireAuth>
              }
            />

            <Route
              path="/X-course-task/basket"
              element={
                <RequireAuth>
                  <Basket />
                </RequireAuth>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </Layout>
    </AppContextProvider>
  );
}

export default App;
