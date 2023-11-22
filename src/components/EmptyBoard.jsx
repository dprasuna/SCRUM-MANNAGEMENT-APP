import Button from "./Button";
import AddEditBoard from "./boards/AddEditBoard";

function EmptyBoard({ type }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h3 className="mx-3 text-center text-2xl">
        {type === "edit"
          ? "This Board Is Empty Create A New Column To Get Started!"
          : "There Are No Boards Available. Create A New Board To Get Started! "}
      </h3>

      <AddEditBoard
        type={type}
        openBtn={<Button styles="mt-4">Create New Board To Start!</Button>}
      />
    </div>
  );
}

export default EmptyBoard;
