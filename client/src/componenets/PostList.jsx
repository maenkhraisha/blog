import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Post from "./Post";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
    const searchParamsObj = Object.fromEntries([...searchParams]);

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/post`, {
        params: {
            page: pageParam,
            limit: 5,
            ...searchParamsObj,
        },
    });

    return response.data;
};

const PostList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["posts", searchParams.toString()],
        queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) =>
            lastPage.hasMore ? pages.length + 1 : undefined,
    });

    if (status === "loading") return "Loading...";

    if (status === "error") return "An error has occurred: ";

    const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

    return (
        <InfiniteScroll
            dataLength={allPosts.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading more posts...</h4>}
            endMessage={
                <p>
                    <b>All Posts loaded!</b>
                </p>
            }>
            {allPosts
                ? allPosts.map((post) => <Post key={post._id} post={post} />)
                : "no post for this category"}
        </InfiniteScroll>
    );
};

export default PostList;
