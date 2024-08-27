import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Button from "../components/Button";

const crudItem = [
  { id: 1, name: "Item 1", description: "Description for item 1" },
  { id: 2, name: "Item 2", description: "Description for item 2" },
  { id: 3, name: "Item 3", description: "Description for item 3" },
];

export default function Crud() {
  // const [items, setItems] = useState(crudItem);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("crudItems")) || crudItem
  );
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const saveToLocalStorage = (items) => {
    localStorage.setItem("crudItems", JSON.stringify(items));
  };

  useEffect(() => {
    setTimeout(() => {
      saveToLocalStorage(items);
      setLoading(false);
    }, 1000);
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newItem = {
      id: items.length + 1,
      name: formData.name,
      description: formData.description,
    };
    setItems([...items, newItem]);
    setFormData({ name: "", description: "" });
    saveToLocalStorage([...items, newItem]);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ name: item.name, description: item.description });
  };

  const handleUpdate = () => {
    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? { ...item, ...formData } : item
    );
    setItems(updatedItems);
    setEditingItem(null);
    setFormData({ name: "", description: "" });
    saveToLocalStorage(updatedItems);
  };

  const handleDelete = (id) => {
    const deleteItems = window.confirm(
      "Are you sure you want to delete the item?"
    );
    if (deleteItems) {
      const updatedItems = items
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, id: index + 1 }));
      setItems(updatedItems);
      // saveToLocalStorage(updatedItems);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.description.toLowerCase().includes(searchItem.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredItems.length / itemsPerPage))
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-screen flex flex-col flex-grow">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Crud Details
      </h1>
      <form onSubmit={editingItem ? handleUpdate : handleCreate}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item name"
          required
          autoComplete="off"
          className="border px-4 py-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Item Description"
          required
          autoComplete="off"
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Search for an item..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="border px-4 py-2 rounded w-full mt-2"
        />

        <div className="flex justify-center mt-5">
          <Button type={editingItem ? "update" : "create"} onClick={() => {}}>
            {editingItem ? "Update Item" : "Create New Item"}
          </Button>
        </div>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="mt-10">
          <thead className="bg-gray-200">
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center border-t border-b">
            {paginatedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td className="space-x-2">
                  <Button type="update" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button type="delete" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredItems.length / itemsPerPage)
            }
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(endIndex, filteredItems.length)}
              </span>{" "}
              of <span className="font-medium">{filteredItems.length}</span>{" "}
              results
            </p>
          </div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {Array.from(
              { length: Math.ceil(filteredItems.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(filteredItems.length / itemsPerPage)
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
