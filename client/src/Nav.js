import { Link } from "react-router-dom";

export default function Nav({ focused, setFocused }) {
  const createStyle = (component) => {
    return { fontWeight: focused === component ? "bold" : "normal" };
  };
  return (
    <>
      <nav>
        <Link
          style={createStyle("authors")}
          onClick={() => {
            setFocused("authors");
          }}
          to="/authors"
        >
          Authors
        </Link>{" "}
        |{" "}
        <Link
          style={createStyle("quotes")}
          onClick={() => {
            setFocused("quotes");
          }}
          to="/quotes"
        >
          Quotes
        </Link>{" "}
        |{" "}
        <Link
          style={createStyle("categories")}
          onClick={() => {
            setFocused("categories");
          }}
          to="/categories"
        >
          Categories
        </Link>
      </nav>
    </>
  );
}
