import React from "react";
import Comment from "./Comment";

const Comments = () => {
    return (
        <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
            <h2 className='text-xl text-gray-500 underline'>Comments</h2>
            <div className='flex items-center justify-between gap-8 w-full '>
                <textarea
                    placeholder='Write a comment...'
                    className='w-full rounded-xl'
                />
                <button className='bg-blue-800 text-white px-4 py-3 font-medium rounded-xl'>
                    Send
                </button>
            </div>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
};

export default Comments;
