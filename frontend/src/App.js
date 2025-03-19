import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './App.css';

export default function App() {
  const [gBook, setGetBook] = useState([]);
  const [formData, setFormData] = useState({
    Book_Name: "",
    Author: "",
    Cost: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentBookName, setCurrentBookName] = useState("");

  const updateFormRef = useRef(null); // Reference for the update form

  // Fetch books from backend
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setGetBook(response.data.data); // Ensure the response contains a `data` property
    } catch (err) {
      console.log("Error fetching books: ", err);
    }
  };

  // Add a new book
  const postData = async (e) => {
    e.preventDefault();
    if (formData.Book_Name && formData.Author && formData.Cost) {
      try {
        await axios.post("http://localhost:5000/api/books", formData);
        fetchData(); // Refresh the list after posting
        setFormData({ Book_Name: "", Author: "", Cost: "" }); // Reset form
      } catch (err) {
        console.log("Error adding book: ", err);
      }
    }
  };

  // Update an existing book
  const putData = async (e) => {
    e.preventDefault();
    if (formData.Book_Name && formData.Author && formData.Cost) {
      try {
        await axios.put(
          `http://localhost:5000/api/books/${currentBookName}`, // Use _id instead of Book_Name
          formData
        );
        fetchData(); // Refresh the list after updating
        setFormData({ Book_Name: "", Author: "", Cost: "" });
        setIsUpdating(false);
        setCurrentBookName(""); // Clear current book name
      } catch (err) {
        console.log("Error updating book: ", err);
      }
    }
  };
  // Delete a book
  const deleteBook = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${name}`);
      fetchData(); // Refresh the list after deletion
    } catch (err) {
      console.log("Error deleting book: ", err);
    }
  };

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch books when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Set the form to update an existing book
  const handleUpdateClick = (book) => {
    setFormData({
      Book_Name: book.Book_Name,
      Author: book.Author,
      Cost: book.Cost,
    });
    setIsUpdating(true); // Enable update mode
    setCurrentBookName(book.Book_Name); // Set the current book name for update

    // Ensure the updateFormRef is set and scroll only when it's available
    if (updateFormRef.current) {
      updateFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-container">
      <h1>Book Store</h1>

      {/* Add Book Form */}
      <form onSubmit={postData}>
        <input
          type="text"
          name="Book_Name"
          placeholder="Book Name"
          value={formData.Book_Name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Author"
          placeholder="Author"
          value={formData.Author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Cost"
          placeholder="Cost"
          value={formData.Cost}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>

      {/* Display List of Books */}
      <h2>Books List</h2>
      {Array.isArray(gBook) && gBook.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Book_Name</th>
              <th>Author</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gBook.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.Book_Name}</td>
                <td>{book.Author}</td>
                <td>{book.Cost}</td>
                <td>
                  <button
                    onClick={() => handleUpdateClick(book)}
                    className="update"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteBook(book.Book_Name)} 
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found</p>
      )}

      {/* Update Book Form */}
      {isUpdating && (
        <div ref={updateFormRef}>
          <h2>Update Book</h2>
          <form onSubmit={putData}>
            <input
              type="text"
              name="Book_Name"
              placeholder="Book Name"
              value={formData.Book_Name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="Author"
              placeholder="Author"
              value={formData.Author}
              onChange={handleChange}
            />
            <input
              type="text"
              name="Cost"
              placeholder="Cost"
              value={formData.Cost}
              onChange={handleChange}
            />
            <button type="submit">Update Book</button>
          </form>
        </div>
      )}
    </div>
  );
}
