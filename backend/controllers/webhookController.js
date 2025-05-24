import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWenbhook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Webhook secret not found");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({ messgae: "webhook verification failed" });
    }

    // Do something with the message...

    if (evt.type === "user.created") {
        const newUser = new User({
            clerkUserId: evt.data.id,
            userName:
                evt.data.username || evt.data.email_addresses[0].email_address,
            email: evt.data.email_addresses[0].email_address,
            image: evt.data.profile_image_url,
        });

        const user = await newUser.save();

        if (!res) {
            return res.status(404).json({ message: "User not saved" });
        }
    }
    if (evt.type === "user.updated") {
        log("User updated");
        const newUser = new User({
            clerkUserId: evt.data.id,
            userName:
                evt.data.username || evt.data.email_addresses[0].email_address,
            email: evt.data.email_addresses[0].email_address,
            image: evt.data.profile_image_url,
        });

        const res = await User.findOneAndUpdate({ _id: evt.data.id }, newUser);
        if (!res) {
            return res.status(404).json({ message: "User not found" });
        }
    }
    if (evt.type === "user.deleted") {
        const res = await User.findOneAndDelete(evt.data.id);
        if (!res) {
            return res.status(404).json({ message: "User not found" });
        }
    }

    return res.status(200).json({ message: "Webhook received" });
};
