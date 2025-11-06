const Button = ({ label, onClick, variant = "primary", disabled = false }) => {
  const base =
    "px-4 py-2 text-sm rounded-md font-medium transition-colors duration-200 focus:outline-none ";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 "
      : "bg-gray-700 text-gray-200 hover:bg-gray-600 ";

  const disabledStyles = "opacity-60 cursor-not-allowed hover:none";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${disabled ? disabledStyles : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
