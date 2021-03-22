// import React from "react";
// import Comment from '../Comment'

// function CommentForm() {

//     function handleSubmit(event) {
//         event.preventDefault();
//         let userName = user;
//         let body = body;
//         this.props.addComment(userName.value, body.value);
//     }


//     return (
//         <form className="comment-form" onSubmit={handleSubmit.bind(this)}>
//             <div className="comment-form-fields">
//                 <input placeholder="Name" required ref={(input) => this.user = input}></input><br />
//                 <textarea placeholder="Comment" rows="4" required ref={(textarea) => this.body = textarea}></textarea>
//             </div>
//             <div className="comment-form-actions">
//                 <Comment></Comment>
//                 <button type="submit">Post Comment</button>
//             </div>
//         </form>
//     );
// }

// export default CommentForm;