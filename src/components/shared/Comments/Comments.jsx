import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyTo, setReplyTo] = useState(null); // Track which comment or reply to reply to
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(4); // Adjust the number of comments per page as needed
    const [replyingTo, setReplyingTo] = useState(null); // Track which comment or reply is being replied to
    const username = "Tamanna";
    const avatar = "https://i.ibb.co/vDzgrz3/replicate-prediction-tt72p7jbdvhnwbili2di7xgygi.jpg";

    useEffect(() => {
        fetchComments();
    }, [productId]); // Fetch comments whenever productId changes

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/comments?productId=${productId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/comments', {
                text: newComment,
                productId: productId,
                username: username,
                avatar: avatar
            });
            setNewComment('');
            fetchComments();
            toast.success('Comment posted successfully!');
        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to post comment');
        }
    };

    const handleReplySubmit = async (parentId) => {
        try {
            await axios.post(`http://localhost:5000/comments/${parentId}/replies`, {
                text: replyText,
                username: username,
                avatar: avatar
            });
            setReplyText('');
            setReplyTo(null); // Clear replyTo after submitting reply
            setReplyingTo(null); // Clear replyingTo after submitting reply
            fetchComments();
            toast.success('Reply posted successfully!');
        } catch (error) {
            console.error('Error posting reply:', error);
            toast.error('Failed to post reply');
        }
    };

    // Pagination logic
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleReplyClick = (commentId, parentId = null) => {
        // Toggle the replyTo state to open/close reply field for the clicked comment or reply
        setReplyTo(commentId === replyTo ? null : commentId);
        setReplyingTo(parentId);
        // Optionally, prefill the reply text with the username of the parent comment or reply
        if (parentId !== null) {
            setReplyText('');
        } else {
            setReplyText('');
        }
    };

    const handleCancelReply = () => {
        setReplyTo(null);
        setReplyingTo(null);
        setReplyText('');
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <ul className="comment-list">
                {currentComments.map(comment => (
                    <li key={comment._id} className="comment-item mb-4">
                        <div className="flex items-center gap-4">
                            <img src={comment?.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
                            <span className="font-bold">{comment?.username}</span>
                        </div>
                        <div className="ml-16 flex items-center gap-4">
                            <div className="comment-text">{comment.text}</div>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleReplyClick(comment._id)}>Reply</button>
                        </div>
                        {comment.replies && (
                            <ul className="reply-list">
                                {comment.replies.map(reply => (
                                    <li key={reply._id} className="reply-item  mb-2">
                                        <div className="flex items-center gap-4 ml-16">
                                            <img src={reply?.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
                                            <span className="font-bold">{reply?.username}</span>
                                        </div>
                                        <div className='flex items-center gap-4 ml-auto'>
                                            <div className="reply-text">{reply.text}</div>
                                            {replyingTo === comment._id && (
                                                <div className="reply-form">
                                                    <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} className="border border-gray-300 rounded p-2 mr-2" />
                                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleReplySubmit(comment._id)}>Post Reply</button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleCancelReply}>Cancel Reply</button>
                                                </div>
                                            )}
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleReplyClick(comment._id, reply._id)}>Reply</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {replyTo === comment._id && (
                            <div className="reply-form ml-16 mt-2">
                                <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} className="border border-gray-300 rounded p-2 mr-2" />
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleReplySubmit(comment._id)}>Post Reply</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="pagination mt-4">
                {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="  text-black font-bold py-2 px-4 rounded mr-2">{index + 1}</button>
                ))}
            </div>
            <div className="comment-input mt-4">
                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} className="border border-gray-300 rounded p-2 mr-2" />
                <button className=" text-black font-bold py-2 px-4 rounded" onClick={handleCommentSubmit}>Post Comment</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Comments;
