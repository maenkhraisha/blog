import axios from "axios";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const fetchComments = async (postId) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comment/${postId}`
    );

    return response.data;
};

const Comments = ({ postId }) => {
    const user = useUser();
    const { isPending, error, data } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => fetchComments(postId),
    });

    const { getToken } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken();

            return axios.post(
                `${import.meta.env.VITE_API_URL}/comment/${postId}`,
                newComment,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comment", postId],
            });
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newComment = {
            desc: formData.get("desc"),
        };

        mutation.mutate(newComment);
    };

    return (
        <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
            <h2 className='text-xl text-gray-500 underline'>Comments</h2>
            <form
                onSubmit={handleSubmit}
                className='flex items-center justify-between gap-8 w-full '>
                <textarea
                    name='desc'
                    placeholder='Write a comment...'
                    className='w-full rounded-xl p-4'
                />
                <button className='bg-blue-800 text-white px-4 py-3 font-medium rounded-xl'>
                    Send
                </button>
            </form>
            {isPending ? (
                "Loading..."
            ) : error ? (
                "Error loading comments!"
            ) : (
                <>
                    {mutation.isPending && (
                        <Comment
                            comment={{
                                desc: `${mutation.variables.desc} (Sending...)`,
                                createdAt: new Date(),
                                user: {
                                    image: user.user.image,
                                    userName: user.user.firstName,
                                },
                            }}
                        />
                    )}

                    {data.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            postId={postId}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default Comments;
