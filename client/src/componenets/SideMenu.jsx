import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";
import { set } from "mongoose";

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterChange = (e) => {
        if (searchParams.get("sort") !== e.target.value) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                sort: e.target.value,
            });
        }
    };

    const handleCategoryChange = (category) => {
        if (searchParams.get("cat") !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat: category,
            });
        }
    };

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
                        onChange={handleFilterChange}
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
                        onChange={handleFilterChange}
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
                        onChange={handleFilterChange}
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
                        onChange={handleFilterChange}
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
                <span
                    className='underline cursor-pointer'
                    onClick={() => handleCategoryChange("general")}>
                    All
                </span>
                <span
                    className='underline cursor-pointer'
                    onClick={() => handleCategoryChange("web-design")}>
                    Web Design
                </span>
                <span
                    className='underline cursor-pointer'
                    onClick={() => handleCategoryChange("development")}>
                    Development
                </span>
                <span
                    className='underline cursor-pointer'
                    onClick={() => handleCategoryChange("databases")}>
                    Databases
                </span>
                <span
                    className='underline cursor-pointer'
                    onClick={() => handleCategoryChange("seo")}>
                    Search Engines
                </span>
                <span
                    className='underline cursor-pointer'
                    onClick={() => handleCategoryChange("marketing")}>
                    Markiting
                </span>
            </div>
        </div>
    );
};

export default SideMenu;
