import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PostMenuActions = ({ post }) => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const {
        isPending,
        error,
        data: savedPosts,
    } = useQuery({
        queryKey: ["savedPosts"],
        queryFn: async () => {
            const token = await getToken();

            return axios.get(`${import.meta.env.VITE_API_URL}/user/saved`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
    });

    const isAdmin = user?.publicMetadata.role === "admin" || false;

    const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();

            return axios.delete(
                `${import.meta.env.VITE_API_URL}/post/${post._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            toast.success("Post deleted successfully");
            navigate("/");
        },
        onError: (error) => {
            toast.error("Error deleting post: ", error);
        },
    });

    const queryClient = useQueryClient();

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();

            return axios.patch(
                `${import.meta.env.VITE_API_URL}/user/save`,
                { postId: post._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
        },
        onError: (error) => {
            toast.error("Error saving post: ", error);
        },
    });
    const featureMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();

            return axios.patch(
                `${import.meta.env.VITE_API_URL}/post/feature`,
                { postId: post._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
        },
        onError: (error) => {
            toast.error("Error feature post: ", error);
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };
    const handlefeature = () => {
        featureMutation.mutate();
    };
    const handleSave = () => {
        if (!user) {
            toast.error("You need to be logged in to save a post");
            return navigate("/login");
        }
        saveMutation.mutate();
    };

    return (
        <div className='mt-8 mb-4 text-sm font-medium'>
            <h2>Actions</h2>
            {!isAdmin &&
                (isPending ? (
                    "Loading..."
                ) : error ? (
                    "Saved post fetching faild!"
                ) : (
                    <div
                        className='flex items-center gap-2 py-2 text-sm cursor-pointer'
                        onClick={handleSave}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 48 48'
                            width='20px'
                            height='20px'>
                            <path
                                d='M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z'
                                stroke='black'
                                strokeWidth='2'
                                fill={
                                    saveMutation.isPending
                                        ? isSaved
                                            ? "none"
                                            : "black"
                                        : isSaved
                                        ? "black"
                                        : "transparent"
                                }
                            />
                        </svg>
                        <span>{isSaved ? "unsave" : "Save"} this post</span>
                        {saveMutation.isPending && (
                            <span className='text-sm'>(in progress)</span>
                        )}
                    </div>
                ))}
            {isAdmin && (
                <div
                    className='flex items-center gap-2 py-2 text-sm cursor-pointer'
                    onClick={handlefeature}>
                    <svg
                        xmns='http://www.w3.org/2000/svg'
                        viewBox='0 0 48 48'
                        width='20px'
                        height='20px'>
                        <path
                            d='M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z'
                            stroke='black'
                            strokeWidth='2'
                            fill={post.isFeatured ? "black" : "none"}
                        />
                    </svg>
                    <span>Feature</span>
                    {featureMutation.isPending && (
                        <span className='text-sm'>(in progress)</span>
                    )}
                </div>
            )}
            {user && (post.user.clerkUserId === user.id || isAdmin) && (
                <div
                    className='flex items-center gap-2 py-2 text-sm cursor-pointer'
                    onClick={handleDelete}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 50 50'
                        fill='red'
                        width='20px'
                        height='20px'>
                        <path d='M16 10C16 8.895 16.895 8 18 8H32C33.105 8 34 8.895 34 10H40C40.552 10 41 10.448 41 11C41 11.552 40.552 12 40 12H10C9.448 12 9 11.552 9 11C9 10.448 9.448 10 10 10H16ZM14 16H36L34.5 38.5C34.3 40.5 32.9 42 31 42H19C17.1 42 15.7 40.5 15.5 38.5L14 16Z' />
                    </svg>

                    <span>Delete this post</span>
                    {deleteMutation.isPending && (
                        <span className='text-sm'>(in progress)</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostMenuActions;
