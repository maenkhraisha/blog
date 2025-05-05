import React from "react";

const PostMenuActions = () => {
    return (
        <div className='mt-8 mb-4 text-sm font-medium'>
            <h2>Actions</h2>
            <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 48 48'
                    width='20px'
                    height='20px'>
                    <path
                        d='M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z'
                        stroke='black'
                        strokeWidth='2'
                    />
                </svg>
                <span>Save this post</span>
            </div>
            <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 50 50'
                    fill='red'
                    width='20px'
                    height='20px'>
                    <path d='M16 10C16 8.895 16.895 8 18 8H32C33.105 8 34 8.895 34 10H40C40.552 10 41 10.448 41 11C41 11.552 40.552 12 40 12H10C9.448 12 9 11.552 9 11C9 10.448 9.448 10 10 10H16ZM14 16H36L34.5 38.5C34.3 40.5 32.9 42 31 42H19C17.1 42 15.7 40.5 15.5 38.5L14 16Z' />
                </svg>

                <span>Delete this post</span>
            </div>
        </div>
    );
};

export default PostMenuActions;
