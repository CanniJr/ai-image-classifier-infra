function buttonClassName(isActive) {
  return isActive
    ? "bg-blue-500 text-white hover:bg-slate-600"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";
}
export function ClassifyButton({ isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${buttonClassName(
        isActive
      )}`}
    >
      {isActive ? "Classifying..." : "Classify Image"}
    </button>
  );
}

// This component is a button that changes its appearance based on the `isActive` prop.
