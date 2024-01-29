import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/quotes?_expand=author")
      .then((r) => r.json())
      .then((data) => {
        setQuotes(data);
      });
  }, []);

  return (
    <div>
      <Link to="/quotes/add">
        <input type="button" value="Add Quote" />
      </Link>
      {quotes.map((q) => (
        <p key={q.id}>
          {q.text}- {q.author.name} <Link to={`/quotes/${q.id}`}>Details</Link>
        </p>
      ))}
    </div>
  );
}
