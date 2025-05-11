'use client';
import useSWR from 'swr';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import comments from '../../public/data/comments.json';


export default function CommentsSection({ currentUser }) {

    // building a tree
    const tree = buildTree(comments);

    return (
        <div className="max-w-3xl p-6 rounded-2xl mx-auto space-y-6 bg-gray-50">
            <CommentForm
                onSubmit={async (content) => {
                    console.log("commented");
                }}
            />
            {tree.map(c => (
                <CommentItem
                    key={c._id}
                    comment={c}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}

function buildTree(list) {
    const lookupTable = {}, roots = [];

    // build a map of comments by id and add a replies array
    list.forEach((commentObject) => (
        lookupTable[commentObject._id] = { ...commentObject, replies: [] }
    ));
    
    // assign replies
    list.forEach((commentObject) => {
        if (commentObject.parentId !== null) {
            lookupTable[commentObject.parentId]?.replies.push(lookupTable[commentObject._id]);
        } else {
            roots.push(lookupTable[commentObject._id]);
        }
    });
    
    return roots;
}
