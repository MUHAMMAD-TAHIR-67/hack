import { AntDesignOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/FirebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';

export default function CreateNote() {
  const navigate = useNavigate();
  const { profilepic, setProfilepic, subject, setSubject, title, setTitle, description, setDescription, id, user, setUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((userDoc) => {
          setUser(userDoc.data());
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Failed to load user data.");
      }
    };

    fetchData();
  }, [setUser]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!profilepic) {
      message.warning("Please upload an image or proceed without it.");
    }

    const noteData = {
      title,
      subject,
      description,
      noteId: id,
      dateCreated: serverTimestamp(),
      createdBy: user.name,
    };

    try {
    
      if (profilepic) {
        const storageRef = ref(storage, `note/${profilepic.name}`);
        await uploadBytes(storageRef, profilepic);
        console.log('Uploaded a blob or file!');
      }

    
      await setDoc(doc(db, "notes", id), noteData);
      message.success("Note created successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error adding document:", error.message);
      message.error("Failed to create note.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
      }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Note</h2>
        <form onSubmit={handleCreate}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Note title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write your note here..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Attach Image (optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setProfilepic(file);
                }
              }}
            />
          </div>
          <Space>
            <Button
              className='mx-4 w-full'
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
              }}
              icon={<AntDesignOutlined />}
            >
              Create Note
            </Button>
          </Space>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Back to <Link to={"/Home/"} className="text-indigo-600 hover:text-indigo-700">notes</Link>
        </p>
      </div>
    </div>
  );
}
