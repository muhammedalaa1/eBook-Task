const Input = ({ title, type }: { type?: string; title?: string }) => {
  return (
    <>
      <label htmlFor={type} className="mt-8 text-start mb-2 font-semibold">
        {title}
      </label>
      <input
        type={type}
        name={type}
        className="border border-black w-full p-2 rounded"
        required
      />
    </>
  );
};
export default Input;
