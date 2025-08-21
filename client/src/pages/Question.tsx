import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postQuestion } from "../lib/api";
import toast from "react-hot-toast";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(20),
  body: z.string().min(5, "Body must be at least 5 characters").max(200),
  tags: z
    .array(z.string().min(3, "Each tag must be at least 3 characters"))
    .optional(),
});

type QuestionInput = z.infer<typeof schema>;

export default function Question() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<QuestionInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      toast.success("Question added Successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      reset();
      navigate("/");
    },
    onError() {
      toast.error("Can't Create a Question.");
    },
  });

  const onSubmit = (data: QuestionInput) => {
    mutate(data as QuestionInput & { tags: string[] });
  };
  useEffect(() => {
    console.log("e", errors);
  }, [errors]);
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Ask a New Question</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title")}
              placeholder="Enter your question title"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Title must be 5-20 characters long.
            </p>
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Body */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              {...register("body")}
              placeholder="Describe your question in detail..."
              className="w-full min-h-[120px] border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
            <p className="text-xs text-gray-500 mt-1">
              Question body must be 5-200 characters long.
            </p>
            {errors.body && (
              <p className="text-sm text-red-500">{errors.body.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tags (optional)
            </label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Comma-separated tags (e.g. react, javascript)"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag.length > 0)
                    )
                  }
                />
              )}
            />
            {errors.tags &&
              (errors.tags as any).map(
                (err: any, index: number) =>
                  err?.message && (
                    <p key={index} className="text-sm text-red-500">
                      Tag No.{index + 1}: {err.message}
                    </p>
                  )
              )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            {isPending ? "Posting..." : "Submit Question"}
          </button>
        </form>
      </div>
    </div>
  );
}
