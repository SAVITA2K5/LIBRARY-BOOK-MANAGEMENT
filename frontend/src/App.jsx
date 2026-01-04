import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="container">
      <h1>Library Book Management System</h1>
      <AddBook />
      <BookList />
    </div>
  );
}

export default App;


