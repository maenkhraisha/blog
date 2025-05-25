import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { format } from "timeago.js";

import ReactQuill from "react-quill-new";

import Image from "../componenets/Image";
import PostMenuActions from "../componenets/PostMenuActions";
import Search from "../componenets/Search";
import Comments from "../componenets/Comments";

const fetchPost = async (slug) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/post/${slug}`
    );

    return response.data;
};

const SinglePost = () => {
    const { slug } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ["post", slug],
        queryFn: () => fetchPost(slug),
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No post found</div>;

    return (
        <div className='flex flex-col gap-8'>
            {/* details */}
            <div className='flex gap-8'>
                <div className='lg:w-3/5 flex flex-col gap-8'>
                    <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
                        {data.title}
                    </h1>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <span>Written by</span>
                        <Link className='text-blue-800'>
                            {data.user.userName}
                        </Link>
                        <span>on</span>
                        <Link className='text-blue-800'>{data.category}</Link>
                        <span>{format(data.createAt)}</span>
                    </div>
                    <p className='text-gray-500 font-medium'>{data.desc}</p>
                </div>
                {data.image && (
                    <div className='hidden lg:block w-2/5'>
                        <Image
                            src={data.image}
                            w={600}
                            className='rounded-2xl'
                        />
                    </div>
                )}
            </div>
            {/* content */}
            <div className='grid grid-cols-4 md:flex-row gap-12'>
                {/* text */}
                <div className='col-span-3  lg:text-lg flex flex-col gap-6 text-justify'>
                    <ReactQuill
                        value={data.content}
                        readOnly={true}
                        theme='bubble'
                    />
                    {/* {data.content} */}
                </div>
                {/* menu */}
                <div className='px-4 h-max sticky top-8'>
                    <h2 className=' mb-4 text-sm font-medium'>Author</h2>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-8'>
                            {/* <img src={data.user.image} alt='' srcset='' /> */}
                            {/* <h2>{data.user.image}</h2> */}
                            {data.user.image && (
                                <Image
                                    src={data.user.image}
                                    className='w-12 h-12 rounded-full object-cover'
                                    w={48}
                                    h={48}
                                />
                            )}
                            <Link className='text-blue-800'>
                                {data.user.userName}
                            </Link>
                        </div>
                        <p className='text-sm text-gray-500'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Pariatur.
                        </p>
                        <div className='flex gap-2'>
                            <Link>
                                <Image src='facebook.svg' />
                            </Link>
                            <Link>
                                <Image src='instagram.svg' />
                            </Link>
                        </div>
                    </div>
                    <PostMenuActions post={data} />
                    <h2 className='mt-8 mb-4 text-sm font-medium'>
                        Categories
                    </h2>
                    <div className='flex flex-col gap-2 text-sm'>
                        <Link className='underline' to='/test'>
                            All
                        </Link>
                        <Link className='underline' to='/test'>
                            Web Design
                        </Link>
                        <Link className='underline' to='/test'>
                            Development
                        </Link>
                        <Link className='underline' to='/test'>
                            Databases
                        </Link>
                        <Link className='underline' to='/test'>
                            Search Engines
                        </Link>
                        <Link className='underline' to='/test'>
                            Markiting
                        </Link>
                    </div>
                    <h2 className='mt-8 mb-4 text-sm font-medium'>Search</h2>
                    <Search />
                </div>
            </div>
            <Comments postId={data._id} />
        </div>
    );
};

export default SinglePost;
