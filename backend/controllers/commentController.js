import Comment from "../models/comment.js";
import User from "../models/user.js";

export const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("user", "userName image")
            .sort({ createdAt: -1 });

        if (!comments) {
            return res.status(404).json({ message: "No comments found" });
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const postId = req.params.postId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkUserId });

    try {
        const newComment = new Comment({
            ...req.body,
            user: user._id,
            post: postId,
        });

        const savedComment = await newComment.save();

        setTimeout(() => {
            res.status(201).json({ message: "Comment added", savedComment });
        }, 4000);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error.message });
    }
};
export const deleteComment = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const id = req.params.id;

    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.auth.sessionClaims?.metadata.role || "user";

    if (role == "admin") {
        await Comment.findOneAndDelete(req.params.id);
        return res.status(200).json({ message: "delete comment success" });
    }

    const user = User.findById(clerkUserId);

    const deletedComment = await Comment.findOneAndDelete({
        _id: id,
        user: user._id,
    });

    if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
};
