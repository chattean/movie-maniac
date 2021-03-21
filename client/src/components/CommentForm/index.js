import React from "react";
import CommentBox from '../CommentBox'

function CommentForm() {

    function handleSubmit(event) {
        event.preventDefault();
        let user = user;
        let body = body;
        this.props.addComment(user.value, body.value);
    }


    return (
        <form className="comment-form" onSubmit={handleSubmit.bind(this)}>
            <div className="comment-form-fields">
                <input placeholder="Name" required ref={(input) => this._user = input}></input><br />
                <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
            </div>
            <div className="comment-form-actions">
                <CommentBox></CommentBox>
                <button type="submit">Post Comment</button>
            </div>
        </form>
    );
}

export default CommentForm;