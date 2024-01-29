import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import Quotes from "./Quotes";
import QuoteDetails from "./QuoteDetails";
import { useState } from "react";
import AddQuote from "./AddQuote";

function App() {
  const [focused, setFocused] = useState();
  return (
    <div className="App">
      <h1>
        💬{" "}
        <Link
          onClick={() => {
            setFocused(null);
          }}
          to="/"
        >
          Quote Saver
        </Link>
      </h1>
      <Nav focused={focused} setFocused={setFocused} />
      <Routes>
        <Route path="/">
          <Route index element={<p>Welcome to Quote Saver</p>} />
          <Route path="quotes">
            <Route path="add" element={<AddQuote />}></Route>
            <Route index element={<Quotes />}></Route>
            <Route path=":id" element={<QuoteDetails />}></Route>
          </Route>
          <Route
            path="authors"
            element={<p>authors component is working</p>}
          ></Route>
          <Route
            path="categories"
            element={<p>categories component is working</p>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
