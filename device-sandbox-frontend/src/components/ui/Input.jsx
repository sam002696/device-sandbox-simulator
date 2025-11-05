const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = "",
  className = "",
}) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label className="text-sm text-gray-300 mb-2 font-medium">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-2 rounded-md bg-[#1E2939] text-gray-200 outline-none border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      />

      {error && (
        <span className="text-xs text-red-400 mt-1 font-medium">{error}</span>
      )}
    </div>
  );
};

export default Input;
