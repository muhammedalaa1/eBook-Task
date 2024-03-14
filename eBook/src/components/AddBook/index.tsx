import { FormEvent, useState } from "react";
import { useAuth } from "../../context/Auth";
import api from "../../../utils/api";
import { ClipLoader } from "react-spinners";

const AddBook = () => {
  const { user, notifyAdd, setAllBooks } = useAuth();
  const [loading, setloading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Science");

  const categories = ["Science", "Comedy", "Thriller"];
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setloading((prev) => !prev);

    const formdata = new FormData(e.target as any);
    formdata.set("userId", String(user?._id));
    formdata.delete("image");
    formdata.delete("pdf");
    //@ts-ignore
    formdata.append("files", e.currentTarget.elements.pdf.files[0]);
    //@ts-ignore
    formdata.append("files", e.currentTarget.elements.image.files[0]);

    try {
      const { data } = await api.post("/api/books", formdata, {
        headers: {
          Accept: "multipart/form-data",
        },
      });
      (e.target as HTMLFormElement).reset();
      console.log(data);
      setAllBooks((prev) => [...prev, data]);
      notifyAdd("Added Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setloading((prev) => !prev);
    }
  }
  return (
    <div className="container mx-12 sm:w-2/3 md:w-1/2 mt-12">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <ClipLoader loading={loading} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <label htmlFor="name" className="mt-8 text-start mb-2 font-semibold">
            name
          </label>
          <input
            type="text"
            title="name"
            name="name"
            className="border border-black w-full p-2 rounded"
          />
          <label
            htmlFor="author"
            className="mt-8 text-start mb-2 font-semibold"
          >
            author
          </label>
          <input
            type="text"
            title="author"
            name="author"
            className="border border-black w-full p-2 rounded"
          />{" "}
          <label
            htmlFor="category"
            className="mt-8 text-start mb-2 font-semibold"
          >
            category
          </label>
          <select
            name="category"
            id=""
            className="w-full p-2 bg-transparent border border-black rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="image" className="mt-8 text-start mb-2 font-semibold">
            Image
          </label>
          <input
            type="file"
            title="Image"
            name="image"
            className="border border-black w-full p-2 rounded"
          />
          <label htmlFor="pdf" className="mt-8 text-start mb-2 font-semibold">
            PDF
          </label>
          <input
            type="file"
            title="PDF"
            name="pdf"
            className="border border-black w-full p-2 rounded"
          />
          <button className="bg-mainColor border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor/90 text-white  rounded-md  duration-300   transition-colors p-2  w-full mt-4 ">
            Add Book
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBook;
