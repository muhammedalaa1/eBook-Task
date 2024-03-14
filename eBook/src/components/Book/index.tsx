import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";
import { type Book } from "../../context/Auth";
import { ClipLoader } from "react-spinners";
const Book = () => {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const param = useParams();
  console.log(param);
  useEffect(() => {
    const getBook = async () => {
      setLoading((prev) => !prev);
      const { data } = await api.get(`/api/books/${param.id}`);
      setBook(data);
      setLoading((prev) => !prev);
    };
    getBook();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader loading={loading} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-12">{book?.name}</h1>
          <object
            data={book?.file.url}
            type=""
            className="w-full h-screen"
          ></object>
        </div>
      )}
    </div>
  );
};

export default Book;
