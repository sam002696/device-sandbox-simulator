const Button = ({ label, onClick, variant = "primary" }) => {
  const base =
    "px-4 py-2 text-sm rounded-md font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-700 text-gray-200 hover:bg-gray-600";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {label}
    </button>
  );
};

export default Button;
