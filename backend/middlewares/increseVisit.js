import Post from "../models/post.js";

const increaseVisit = async (req, res, next) => {
    const slug = req.params.slug;

    try {
        await Post.findOneAndUpdate(
            { slug },
            { $inc: { visit: 1 } },
            { new: true }
        );

        next();
    } catch (error) {
        console.error("Error updating visit count:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default increaseVisit;
