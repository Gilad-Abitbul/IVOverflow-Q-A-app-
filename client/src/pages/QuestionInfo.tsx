import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnswers, getQuestion, postAnswer } from "../lib/api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RootState } from "../store";
import toast from "react-hot-toast";
import FullPageLoader from "../components/FullPageLoader";

const schema = z.object({
  body: z
    .string()
    .min(10, "Answer must be at least 10 characters")
    .max(250, "Answer must be no more than 250 characters"),
});

type AnswerInput = z.infer<typeof schema>;

const QuestionInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const {
    data: question,
    isLoading: isLoadingQuestion,
    error: errorQuestion,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: async () => await getQuestion(id as string),
  });

  const {
    data: answers,
    isLoading: isLoadingAnswers,
    error: errorAnswers,
  } = useQuery({
    queryKey: ["answers", id],
    queryFn: async () => await getAnswers(id as string),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnswerInput>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AnswerInput) =>
      postAnswer({ body: data.body, qid: id as string }),
    onSuccess: () => {
      toast.success("Answer added successfully.");
      reset();
      queryClient.invalidateQueries({ queryKey: ["answers", id] });
    },
  });

  const onSubmit = (data: AnswerInput) => {
    mutate(data);
  };

  if (isLoadingQuestion) return <FullPageLoader />;

  if (errorQuestion)
    return <p className="p-6 text-red-500">Failed to load question.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      {/* Question */}
      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <div className="text-sm text-gray-700">
          Asked by{" "}
          <span className="font-bold">
            {typeof question!.owner === "string" ? (
              <span>Unknown User</span>
            ) : (
              <span>
                {question!.owner.fullName} ({question!.owner.nickname})
              </span>
            )}
          </span>{" "}
          on{" "}
          {new Date(question!.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{question!.title}</h1>
        <p className="text-gray-700">{question!.body}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {question!.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div className="bg-white rounded-xl shadow p-6">
        {isAuthenticated ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-xs text-gray-500 mt-0">
              Answer body must be 10-250 characters long.
            </p>
            <textarea
              {...register("body")}
              className="w-full min-h-[120px] border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Write your answer here..."
            />
            {errors.body && (
              <p className="text-sm text-red-500">{errors.body.message}</p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              {isPending ? "Posting..." : "Submit Answer"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              You must be logged in to post an answer.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Login to Answer
            </button>
          </div>
        )}
      </div>

      {/* Answers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Answers</h2>
        {isLoadingAnswers ? (
          <p>Loading answers...</p>
        ) : answers?.length === 0 ? (
          <p className="text-gray-500">No answers yet.</p>
        ) : (
          answers!.map((answer) => (
            <div
              key={answer._id}
              className="bg-white shadow rounded-lg p-4 space-y-2"
            >
              <p className="text-gray-700 whitespace-pre-wrap">{answer.body}</p>
              <div className="text-sm text-gray-700 font-semibold">
                By{" "}
                {typeof answer.owner === "string"
                  ? "Unknown"
                  : `${answer.owner.fullName} (${answer.owner.nickname})`}{" "}
                on{" "}
                {new Date(answer.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionInfo;
