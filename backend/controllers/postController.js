import Post from "../models/post.js";
import User from "../models/user.js";

import ImageKit from "imagekit";

export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const query = {};
    const cat = req.query.cat;
    const author = req.query.author;
    const search = req.query.search;
    const sortQuery = req.query.sort;
    const featured = req.query.featured;

    if (cat) {
        query.category = cat;
    }
    if (search) {
        query.title = { $regex: search, $options: "i" };
    }
    if (author) {
        const user = await User.findOne({ userName: author }).select("_id");
        if (!user) return res.status(404).json({ message: "User not found" });
        query.user = user._id;
    }

    let sortObj = { createdAt: -1 };

    if (sortQuery) {
        switch (sortQuery) {
            case "newest":
                sortObj = { createdAt: -1 };
                break;
            case "oldest":
                sortObj = { createdAt: 1 };
                break;
            case "popular":
                sortObj = { visit: -1 };
                break;
            case "trending":
                // get the posts with the most visits in the last 7 days
                sortObj = { visit: -1 };
                // get the posts created in the last 7 days
                query.createdAt = {
                    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                };
                break;
            default:
                break;
        }
    }

    if (featured) {
        query.isFeatured = true;
    }

    try {
        const posts = await Post.find(query)
            .populate("user", "userName")
            .sort(sortObj)
            .limit(limit)
            .skip((page - 1) * limit);

        const totalPosts = await Post.countDocuments();
        const hasMore = page * limit < totalPosts;
        res.status(200).json({ posts, hasMore });
    } catch (error) {
        console.log(error);
    }
};

export const getPost = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
        "user",
        "userName image clerkUserId"
    );

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
};

export const createPost = async (req, res) => {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ clerkUserId });

    if (!user) {
        return res.status(401).json({ message: "user not found" });
    }

    let slug = req.body.title.replace(/ /g, "-").toLowerCase();

    let existingPost = await Post.findOne({ slug });

    // check if the slug already exists
    // if it does, append a number to the slug
    // e.g. "my-post" becomes "my-post-1", "my-post-2", etc.
    // this is a simple way to do it, but you can also use a library like slugify

    let i = 2;
    let newSlug = slug;

    try {
        while (existingPost) {
            newSlug = `${slug}-${i}`;
            existingPost = await Post.findOne({ slug: newSlug });
            i++;
        }
        const newPost = new Post({
            user: user._id,
            slug: newSlug,
            ...req.body,
        });

        const post = await newPost.save();
        if (!post) {
            return res.status(400).json({ message: "Post not created" });
        }
        res.status(201).json({ message: "create post success", post });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (req, res) => {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.auth.sessionClaims?.metadata.role || "user";

    if (role == "admin") {
        const deletedPost = await Post.findOneAndDelete(req.params.id);
        return res.status(200).json({ message: "delete post success" });
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
        return res.status(401).json({ message: "user not found" });
    }

    const deletedPost = await Post.findOneAndDelete({
        _id: req.params.id,
        user: user._id,
    });

    if (!deletedPost) {
        return res.status(403).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "delete post success" });
};

export const uploadAuth = async (req, res) => {
    const imagekit = new ImageKit({
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
        urlEndpoint: process.env.IK_URL_ENDPOINT,
    });
    try {
        const result = imagekit.getAuthenticationParameters();
        return res.status(200).json(result);
    } catch (err) {
        console.error("ImageKit Auth Error:", err);
        return res.status(500).json({ message: "Auth generation failed" });
    }
};

export const featurePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.auth.sessionClaims?.metadata.role || "user";

    if (role !== "admin") {
        return res.status(403).json({ message: "You cannot feature post" });
    }

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isFeatured = post.isFeatured;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { isFeatured: !isFeatured },
            { new: true }
        );

        res.status(200).json(
            { message: "Post featured successfully" },
            updatedPost
        );
    } catch (error) {
        console.log(error);
    }
};
