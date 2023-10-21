import { useMEM } from "react-mem-js";
import React, { useEffect, useState } from "react";

export default function Books() {
  const library = useMEM("yBgIzbc3lvwlBjw6V-G9Woy5Hx2uY37aDQIPoQ5kRRw");
  // const guestbook = useMEM("9vCmVRVClieRNymPm00oMJlmGzL5VZlqzcL3KCz6xS0");

  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    setBooks(library.state.books);
  }, [library]);

  return (
    <main className="bg-white text-black h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-20">Library Example</h1>
      <div>
        {books?.length !== 0 && (
          <div className="flex flex-col border-black border-2">
            {books?.map((book) => <div className="px-2">{book}</div>)}
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-2 mt-4">
        <input className="border-2 border-black px-2.5 py-1" onChange={(e) => setBookName(e.target.value)} />
        <button
          className="border-2 border-black px-2.5 py-1"
          onClick={() => library.write([{ input: { function: "save", bookName } }])}
        >
          Save Book
        </button>
      </div>
    </main>
  );
}
