function Button({
  children,
  type = "button",
  styles,
  variation = "regular",
  onClick,
}) {
  return (
    <button
      type={type}
      className={`${styles} rounded-full
       ${variation === "regular" && "bg-blue text-white "} 
      ${variation === "secondary" && "bg-[#d1d5db]  text-blue "}
      ${variation === "danger" && "bg-red-500 text-white "} px-4 py-2 
      text-lg font-semibold 
    duration-200 hover:opacity-[0.8]`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
