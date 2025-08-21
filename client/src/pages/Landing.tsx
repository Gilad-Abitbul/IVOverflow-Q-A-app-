import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../lib/api";
import { Link } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import toast from "react-hot-toast";

const Landing = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    retry: false,
  });

  if (isLoading) return <FullPageLoader />;

  if (error) {
    toast.error("Failed to load questions.");
    return <div className="p-4 text-red-500">Failed to load questions.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-end">
        <Link
          to="/question"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-5 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Ask a Question
        </Link>
      </div>
      {data && data.length === 0 && (
        <div className="text-center text-gray-500">No questions yet.</div>
      )}

      {data?.map((q) => (
        <Link
          key={q._id}
          to={`/question/${q._id}`}
          className="block rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200 p-5"
        >
          <div className="flex flex-col gap-2">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800">{q.title}</h2>

            {/* Author & Date */}
            <div className="text-sm text-gray-500 font-medium">
              Posted by{" "}
              <span className="text-gray-700">
                {typeof q.owner === "string" ? "Unknown" : q.owner.nickname}
              </span>{" "}
              on{" "}
              {new Date(q.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Body */}
            <p className="text-gray-700 text-sm line-clamp-3">{q.body}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-3">
              {q.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Landing;
