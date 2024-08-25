import { useEffect, useState } from "react"
import Button from "../components/Button";


const crudItem = [
  { id: 1, name: 'Item 1', description: 'Description for item 1' },  
  { id: 2, name: 'Item 2', description: 'Description for item 2' },
  { id: 3, name: 'Item 3', description: 'Description for item 3' },
  
]

export default function Crud() {
  // const [items, setItems] = useState(crudItem);
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('crudItems')) || crudItem);
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({name: '', description: ''});
  const [isMessage, setIsMessage] = useState(false);

  
  const saveToLocalStorage = (items) => {
    localStorage.setItem('crudItems', JSON.stringify(items))
  }

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }
  
  const handleCreate = (e) => {
    e.preventDefault();
    const newItem = {
      id: items.length + 1,
      name: formData.name,
      description: formData.description
    };
    setItems([...items, newItem])
    setFormData({ name: '', description: '' });
    saveToLocalStorage([...items, newItem])
  }

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ name: item.name, description: item.description });
  }

  const handleUpdate = () => {
    const updatedItems = items.map((item) => 
    item.id === editingItem.id ? { ...item, ...formData } : item
    );
   setItems(updatedItems);
   setEditingItem(null);
   setFormData({ name: '', description: ''});
   saveToLocalStorage(updatedItems)
   setIsMessage(true)
   
  }

  // const handleDelete = (id) => {
  //   const updatedItems = items.filter((item) => item.id !== id);
  //   setItems(updatedItems); 

  //   const renumberedItems = updatedItems.map((item, index) => ({
  //     ...item,
  //     id: index + 1,
  // }));

  //   setItems(renumberedItems);
  //   // saveToLocalStorage(updatedItems)

  // }

  const handleDelete = (id) => {
    const deleteItems = window.confirm("Are you sure you want to delete the item?")
    if (deleteItems) {
      const updatedItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index + 1 }));
    setItems(updatedItems);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-screen flex flex-col flex-grow">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Crud Details</h1>
      <form onSubmit={editingItem ? handleUpdate : handleCreate}>
      <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item name"
          required
          className="border px-4 py-2 rounded mb-2 w-full" 
          />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Item description"
          required
          className="border px-4 py-2 rounded mb-4  w-full"
        />
        <div className="flex justify-center">
        {/* {editingItem ? (
          <Button type="update" onClick={() => {}}>
            Update Item
          </Button>
        ) : (
          <Button type="create" onClick={() => {}}>
            Create New Item
          </Button>
        )} */}
   
        <Button type={editingItem ? "update" : "create"} onClick={() => {}}>
          {editingItem ? "Update Item" : "Create New Item"}
        </Button> 
        {isMessage && <div>Item Updated</div>}
        </div>
      </form>
   
      {/* <div>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <p className="text-gray-500">{item.id}</p>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div className="space-x-2">
              <Button type="update" onClick={() => handleEdit(item)}>
                Edit
              </Button>
              <Button type="delete" onClick={()=> handleDelete(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div> */}
      <table className="mt-10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center border-t border-b">
          {items.map((item) => (
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
    </div>
  );
}
