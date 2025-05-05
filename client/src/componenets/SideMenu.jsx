import { Link } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
    return (
        <div className='px-4 h-max sticky top-8'>
            <h2 className='mb-4 text-sm font-medium'>Search</h2>
            <Search />
            <h2 className='mt-8 mb-4 text-sm font-medium'>Filter</h2>
            <div className='flex flex-col gap-2 text-sm'>
                <label
                    htmlFor='newest'
                    className='flex items-center gap-2 cursor-pointer '>
                    <input
                        type='radio'
                        name='sort'
                        value='newest'
                        id='newest'
                        className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 
                        rounded-sm cursor-pointer checked:bg-blue-800 bg-white'
                    />
                    Newest
                </label>
                <label
                    htmlFor='popular'
                    className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        value='popular'
                        id='popular'
                        className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 
                        rounded-sm cursor-pointer checked:bg-blue-800 bg-white'
                    />
                    Most Populer
                </label>
                <label
                    htmlFor='trending'
                    className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        value='trending'
                        id='trending'
                        className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 
                        rounded-sm cursor-pointer checked:bg-blue-800 bg-white'
                    />
                    Trending
                </label>
                <label
                    htmlFor='oldest'
                    className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type='radio'
                        name='sort'
                        value='oldest'
                        id='oldest'
                        className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 
                        rounded-sm cursor-pointer checked:bg-blue-800 bg-white'
                    />
                    Oldest
                </label>
            </div>
            <h2 className='mt-8 mb-4 text-sm font-medium'>Category</h2>
            <div className='flex flex-col gap-2 text-sm'>
                <Link className='underline' to='/posts'>
                    All
                </Link>
                <Link className='underline' to='/posts?cat=web-design'>
                    Web Design
                </Link>
                <Link className='underline' to='/posts?cat=development'>
                    Development
                </Link>
                <Link className='underline' to='/posts?cat=databases'>
                    Databases
                </Link>
                <Link className='underline' to='/posts?cat=seo'>
                    Search Engines
                </Link>
                <Link className='underline' to='/posts?cat=markiting'>
                    Markiting
                </Link>
            </div>
        </div>
    );
};

export default SideMenu;
