import { useState } from "react"
import Button from "../components/Button";



const crudItem = [
  {
    id: 1, name: 'Item 1', description: 'Description for item 1',
    id: 2, name: 'Item 2', description: 'Description for item 2',
  }
]

export default function Crud() {
  const [items, setItems] = useState(crudItem);
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({name: '', description: ''});


  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setFormData({...formData, [name]: value});
  }
  
  const handleCreate = () => {
    const newItem = {
      id: items.length + 1,
      name: formData.name,
      description: formData.description
    };
    setItems([...items, newItem])



  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Crud Details</h1>
      <div className="mb-6 flex justify-center items-center">
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item name"
          required
          className="border px-4 py-2 rounded mb-2 w-full" />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Item description"
          required
          className="border py-4 px-2 mb-4 rounded w-full"
        />
        {editingItem ? (
          <Button type="update" onClick={handleUpdate}>
            Update Item
          </Button>
        ) : (
          <Button type="create" onClick={handleCreate}>
            Create New Item
          </Button>
        )}
      
      </div>

      <div>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div>
              <Button type="update" onClick={handleEdit(item)}>
                Edit
              </Button>
              <Button type="delete" onClick={handleDelete(item.id)}>
                Delete
              </Button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
