import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../componenets/Upload";

const Write = () => {
    const [value, setValue] = useState("");
    const [cover, setCover] = useState("");
    const [img, setImg] = useState("");
    const [video, setVideo] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        img && setValue((prev) => prev + `<p><image src="${img.url}"/> </p>`);
    }, [img]);

    useEffect(() => {
        video &&
            setValue(
                (prev) =>
                    prev +
                    `<p><iframe className="ql-video" src="${video.url}"/> </p>`
            );
    }, [video]);

    const { isLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return axios.post(`${import.meta.env.VITE_API_URL}/post`, newPost, {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: (res) => {
            toast.success("Post created successfully");
            navigate(`/${res.data.post.slug}`);
        },
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (isLoaded && !isSignedIn) {
        return <div>Please sign in to write a post.</div>;
    }

    const handleContentChange = (content, delta, source, editor) => {
        setValue(editor.getHTML());
    };

    const handleSubmite = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newPost = {
            image: cover.filePath || "placeholder.jpg",
            title: formData.get("title"),
            category: formData.get("category"),
            desc: formData.get("desc"),
            content: value,
        };
        mutation.mutate(newPost);
    };

    return (
        <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
            <h1 className='text-cl font-light'>Create a New Post</h1>
            <form
                onSubmit={handleSubmite}
                className='flex flex-col gap-6 flex-1 mb-6 '>
                <Upload
                    progress={progress}
                    setProgress={setProgress}
                    setData={setCover}
                    data={cover}
                    type='image'>
                    <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>
                        Add a cover image
                    </button>
                </Upload>
                <input
                    className='text-4xl font-semibnold bg-transparent outline-none'
                    type='text'
                    placeholder='My Awsome Story'
                    name='title'
                    autoFocus
                    autoComplete='off'
                    required
                />
                <div className='flex items-center gap-4'>
                    <label htmlFor='' className='text-sm'>
                        Choose a category:
                    </label>
                    <select
                        name='category'
                        id=''
                        className='p-2 rounded-xl bg-white shadow-md'>
                        <option value='general'>General</option>
                        <option value='web-design'>Web Design</option>
                        <option value='development'>Development</option>
                        <option value='databases'>Databases</option>
                        <option value='seo'>Search Engines</option>
                        <option value='markiting'>Markiting</option>
                    </select>
                </div>
                <textarea
                    className='p-4 rounded-xl bg-white shadow-md'
                    name='desc'
                    placeholder='Ashort Description'
                />
                <div className='flex flex-1'>
                    <div className='flex flex-col gap-2 mr-2'>
                        <Upload
                            setProgress={setProgress}
                            setData={setImg}
                            type='image'>
                            🖼️
                        </Upload>
                        <Upload
                            setProgress={setProgress}
                            setData={setVideo}
                            type='video'>
                            ▶️
                        </Upload>
                    </div>
                    <ReactQuill
                        value={value}
                        onChange={handleContentChange}
                        theme='snow'
                        className='flex-1 rounded-xl bg-white shadow-md'
                        readOnly={0 < progress && progress < 100}
                    />
                </div>
                <button
                    disabled={
                        mutation.isPending || (progress > 0) & (progress < 100)
                    }
                    type='submit'
                    className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 
                                disabled:bg-blue-400 disabled:cursor-not-allowed'>
                    {mutation.isPending ? "sending ..." : "Send"}
                </button>
                {mutation.isError && (
                    <div className='text-red-500'>{mutation.error.message}</div>
                )}
                {mutation.isSuccess && (
                    <div className='text-green-500'>
                        Post created successfully
                    </div>
                )}
                {mutation.isLoading && (
                    <div className='text-blue-500'>Creating post...</div>
                )}
            </form>
        </div>
    );
};

export default Write;
