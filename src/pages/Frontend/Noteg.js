import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/FirebaseConfig';
import { Card, Button, Typography, Modal, Input, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faComments } from '@fortawesome/free-solid-svg-icons';

const { Title, Paragraph } = Typography;

function NoteGrid() {
    const { note, setNote, id } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [loadingNotes, setLoadingNotes] = useState(true);
    const [loadingComments, setLoadingComments] = useState(false);
    const { user, setUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((userDoc) => {
                    setUser(userDoc.data());
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [setUser]);

    
    useEffect(() => {
        const fetchNotes = async () => {
            setLoadingNotes(true);
            try {
                const querySnapshot = await getDocs(collection(db, "notes"));
                const notesArray = querySnapshot.docs.map((note) => ({
                    id: note.id,
                    ...note.data(),
                }));
                setNote(notesArray);
            } catch (error) {
                console.error("Error fetching notes:", error);
                message.error("Failed to load notes.");
            } finally {
                setLoadingNotes(false);
            }
        };

        fetchNotes();
    }, [setNote]);


    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const querySnapshot = await getDocs(collection(db, "comments"));
            const commentArray = querySnapshot.docs.map((comment) => ({
                id: comment.id,
                ...comment.data(),
            }));
            setComments(commentArray);
        } catch (error) {
            console.error("Error fetching comments:", error);
            message.error("Failed to load comments.");
        } finally {
            setLoadingComments(false);
        }
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    
    const handleOk = async () => {
        if (!commentInput) {
            message.warning("Comment cannot be empty.");
            return;
        }

        const commentData = {
            comnt: commentInput,
            commentId: id,
            dateCreated: serverTimestamp(),
            createdBy: user.name,
        };

        try {
            await setDoc(doc(db, "comments", id), commentData);
            message.success("Comment added successfully!");
            setCommentInput("");  
            fetchComments();  
        } catch (error) {
            console.error("Error adding comment:", error);
            message.error("Failed to add comment.");
        } finally {
            setIsModalOpen(false);
        }
    };

    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    
    if (loadingNotes) {
        return <div>Loading notes...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            padding: '30px',
            backgroundColor: '#f3f4f6',
            borderRadius: '12px',
        }}>
            {Array.isArray(note) && note.length > 0 ? (
                note.map((note) => (
                    <Card
                        key={note.id}
                        style={{
                            width: 230,
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                        }}
                        title={
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <span style={{
                                    padding: '6px 12px',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: note.category === 'Business' ? '#6c5ce7' :
                                        note.category === 'Home' ? '#00b894' :
                                        '#fdcb6e',
                                }}>
                                    {note.category}
                                </span>
                                <span style={{ fontSize: '0.9em', color: '#777' }}>{note.date}</span>
                            </div>
                        }
                    >
                        <Title level={5}>{note.title}</Title>
                        <Title level={4}>{note.subject}</Title>
                        <Paragraph>{note.description}</Paragraph>
                        <Paragraph>{note.createdBy}</Paragraph>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px',
                        }}>
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faComments} />}
                                title="Reload Comments"
                                style={{ color: '#777' }}
                                onClick={fetchComments}
                            />
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faComment} />}
                                title="Add Comment"
                                style={{ color: '#777' }}
                                onClick={showModal}
                            />
                        </div>
                    </Card>
                ))
            ) : (
                <p>No notes available</p>
            )}

            <Modal
                title="Add Comment"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                    <Input
                        type="text"
                        id="comment"
                        placeholder="Enter your comment"
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        required
                    />
                </div>
            </Modal>

            <Modal
                title="Comments"
                visible={loadingComments}
                footer={null}
                onCancel={() => setLoadingComments(false)}
            >
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <b>{comment.createdBy}:</b>
                            <Paragraph>{comment.comnt}</Paragraph>
                            <hr />
                        </div>
                    ))
                ) : (
                    <Paragraph>No comments available</Paragraph>
                )}
            </Modal>
        </div>
    );
}

export default NoteGrid;
