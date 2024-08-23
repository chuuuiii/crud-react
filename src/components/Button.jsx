
const Button = ({  type, onClick, children }) => {
  const baseStyles = "px-4 py-2 font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  const typeStyles = {
    create: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    read: "bg-blue-500 hover:bg-blue-600 focus:ring-green-300",
    update: "bg-yellow-500 hover:bg-yellow-600 focus:ring-green-300",
    delete: "bg-red-500 hover:bg-red-600 focus:ring-green-300"

  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${typeStyles [type] || "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300"}`}>
      {children}
    </button>
  )
}

export default Button;