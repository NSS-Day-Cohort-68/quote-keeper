import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function QuoteDetails() {
  const [categories, setCategories] = useState([]);
  const [quote, setQuote] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8088/categories")
      .then((res) => res.json())
      .then(setCategories);
    fetch(
      `http://localhost:8088/quotes/${id}?_expand=author&_embed=quoteCategories`,
    )
      .then((res) => res.json())
      .then(setQuote);
  }, [id]);

  if (!quote) {
    return <p>💬</p>;
  }

  return (
    <>
      <p>{quote.text}</p>
      <p> - {quote.author.name}</p>
      {quote.quoteCategories.map((qc) => {
        return (
          <p key={qc.id}>
            {categories.find((c) => qc.categoryId === c.id).name}
          </p>
        );
      })}
    </>
  );
}
