import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddQuote() {
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const navigate = useNavigate();

  const checkListener = (e) => {
    const { checked, value } = e.target;
    const clone = structuredClone(selectedCategoryIds);

    if (checked) {
      clone.push(parseInt(value));
      setSelectedCategoryIds(clone);
    } else {
      setSelectedCategoryIds(clone.filter((c) => c !== parseInt(value)));
    }
  };

  useEffect(() => {
    fetch("http://localhost:8088/authors")
      .then((res) => res.json())
      .then(setAuthors);
    fetch("http://localhost:8088/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleSubmit = () => {
    const author = {
      text,
      authorId,
    };

    fetch("http://localhost:8088/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    })
      .then((res) => res.json())
      .then((res) => {
        const promises = selectedCategoryIds.map((c) => {
          return fetch("http://localhost:8088/quoteCategories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quoteId: res.id,
              categoryId: c,
            }),
          });
        });
        return Promise.all(promises);
      })
      .then(() => {
        navigate("/quotes");
      });
  };

  return (
    <>
      <div>
        <label htmlFor="text">Quote Text</label>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="authorId">Author</label>
        <select
          value={authorId}
          onChange={(e) => {
            setAuthorId(parseInt(e.target.value));
          }}
        >
          <option disabled value="0">
            Please Choose an author
          </option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {categories.map((c) => (
          <div key={c.id}>
            <label>{c.name}</label>
            <input
              type="checkbox"
              value={c.id}
              checked={selectedCategoryIds.includes(c.id)}
              onChange={checkListener}
            />
          </div>
        ))}
      </div>
      <input type="button" value="Add Quote" onClick={handleSubmit} />
    </>
  );
}
