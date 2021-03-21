import React from "react";

function Comment() {
    const user = user;
    const commentBody = commentBody;
    return (
        <div className="comment">
            <p className="comment-header">{user}</p>
            <p className="comment-body">- {commentBody}</p>

        </div>
    );
}

export default Comment;