import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

export default function useComments(productId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Lấy comment ban đầu từ API
        fetch(`/api/products/${productId}/reviews`)
            .then((res) => res.json())
            .then(setComments);

        socket.on("comment_added", (data) => {
            if (data.productId === productId) {
                setComments((prev) => [data, ...prev]);
            }
        });

        return () => {
            socket.off("comment_added");
        };
    }, [productId]);

    const addComment = (comment) => {
        socket.emit("new_comment", { ...comment, productId });
    };

    return { comments, addComment };
}
