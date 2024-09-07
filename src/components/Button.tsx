import { TfiReload } from "react-icons/tfi";
const Button = () => {
  return (
    <button
          type="submit"
          className="w-full sm:w-auto mb-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <TfiReload/>
        </button>
  );
};
export default Button;
