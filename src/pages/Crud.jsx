import { useState } from "react"
import Button from "../components/Button";


const crudItem = [
  { id: 1, name: 'Item 1', description: 'Description for item 1' },  
  { id: 2, name: 'Item 2', description: 'Description for item 2' },
  
]

export default function Crud() {
  const [items, setItems] = useState(crudItem);
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({name: '', description: ''});


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
  }

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems); 

  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
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
        {editingItem ? (
          <Button type="update" onClick={() => {}}>
            Update Item
          </Button>
        ) : (
          <Button type="create" onClick={() => {}}>
            Create New Item
          </Button>
        )}
        </div>
      </form>
   
       

      <div>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border-b">
            <div>
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
      </div>
    </div>
  );
}
