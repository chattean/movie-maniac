import React from "react";
import CommentForm from "../CommentForm";
import Comment from '../Comment';
import { useSelector } from "react-redux";

function CommentBox() {
    const state = useSelector(state => state);


    function addComment(user, body) {
        const comment = {
            id: state.comments.length + 1,
            user,
            body
        };
        this.setState({ comments: state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }

    function handleClick() {
        this.setState({
            showComments: !state.showComments
        });
    }

    function getComments() {
        return state.comments.map((comment) => {
            return (
                <Comment
                    user={comment.user}
                    body={comment.body}
                    key={comment.id} />
            );
        });
    }

    function getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }
    const comments = getComments();
    let commentNodes;
    let buttonText = 'Show Comments';

    if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
    }
    return (
        <div className="comment-box">
            <h2>Join the Discussion!</h2>
            <CommentForm addComment={addComment.bind()} />
            <button id="comment-reveal" onClick={handleClick.bind(this)}>
                {buttonText}
            </button>
            <h3>Comments</h3>
            <h4 className="comment-count">
                {getCommentsTitle(comments.length)}
            </h4>
            {commentNodes}
        </div>
    );


}

export default CommentBox