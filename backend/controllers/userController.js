import User from "../models/user.js";

export const getUserSavedPosts = async (req, res) => {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ clerkUserId });

    if (!user) {
        return res.status(401).json({ message: "user not found" });
    }

    res.status(200).json(user.savedPosts);
};

export const savePosts = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { postId } = req.body;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkUserId });

    const isSaved = user.savedPosts.some((post) => post === postId);

    try {
        if (!isSaved) {
            await User.findByIdAndUpdate(user._id, {
                $push: { savedPosts: postId },
            });
        } else {
            await User.findByIdAndUpdate(user._id, {
                $pull: { savedPosts: postId },
            });
        }
    } catch (error) {
        console.log(error);
    }

    setTimeout(() => {
        res.status(200).json({
            message: isSaved ? "Post unsaved" : "Post saved",
        });
    }, 1000);
};
