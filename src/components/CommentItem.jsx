'use client';
import { useState } from 'react';
import CommentForm from './CommentForm';

export default function CommentItem({ comment, currentUser, onAction, depth = 0 }) {
    const [isReplying, setReplying] = useState(false);
    const [isEditing, setEditing] = useState(false);

    const isAuthor = currentUser.id === comment.author.id;
    const hasLiked = comment.likes.includes(currentUser.id);

    const doLike = async () => {
        await fetch(`/api/comments/${comment._id}/${hasLiked ? 'unlike' : 'like'}`, { method: 'POST' });
        onAction();
    };
    const doDelete = async () => {
        if (!confirm('Delete this comment?')) return;
        await fetch(`/api/comments/${comment._id}`, { method: 'DELETE' });
        onAction();
    };
    const doEdit = async (newText) => {
        await fetch(`/api/comments/${comment._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newText })
        });
        setEditing(false);
        onAction();
    };

    return (
        <div className={`pl-${depth * 4} border-l ${depth ? 'border-gray-200' : ''} space-y-2`}>
            <div className="flex items-start space-x-3">
                <img src={comment.author.avatar} className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                    <div className="text-sm font-semibold">{comment.author.name}</div>
                    {isEditing
                        ? <CommentForm initialValue={comment.content} onSubmit={doEdit} onCancel={() => setEditing(false)} />
                        : <p className="text-gray-700">{comment.content}</p>
                    }
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <button onClick={doLike}>
                            {hasLiked ? '👍' : '👍🏻'} {comment.likes.length}
                        </button>
                        <button onClick={() => setReplying(!isReplying)}>Reply</button>
                        {isAuthor && <button onClick={() => setEditing(true)}>Edit</button>}
                        {isAuthor && <button onClick={doDelete}>Delete</button>}
                        <span>{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Reply form */}
            {isReplying && (
                <div className="mt-2">
                    <CommentForm
                        onSubmit={async (content) => {
                            await fetch('/api/comments', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    postId: comment.postId,
                                    parentId: comment._id,
                                    content,
                                    author: currentUser
                                })
                            });
                            setReplying(false);
                            onAction();
                        }}
                        onCancel={() => setReplying(false)}
                    />
                </div>
            )}

            {/* Nested replies */}
            {comment.replies.map(child => (
                <CommentItem
                    key={child._id}
                    comment={child}
                    currentUser={currentUser}
                    onAction={onAction}
                    depth={depth + 1}
                />
            ))}
        </div>
    );
}
