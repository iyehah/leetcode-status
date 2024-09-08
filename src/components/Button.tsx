import { TfiReload } from "react-icons/tfi";
const Button = () => {
  return (
    <button
          type="submit"
          className=" flex flex-row items-center justify-between w-full sm:w-auto mb-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Generator <TfiReload className=" ml-1"/>
        </button>
  );
};
export default Button;
