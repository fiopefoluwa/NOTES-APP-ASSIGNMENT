import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './home.css';
import cancel from '../../images/icons8-cancel-48.png';
import addi from '../../images/icons8-add-note-96.png';
import ellipsis from '../../images/icons8-more-64.png';
import editpencil from '../../images/icons8-pencil-64.png';
import bin from '../../images/icons8-delete-48.png';

const Home = () => {
  const [title, setTitle] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [description, setDescription] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [popupShouldShow, setpopupShouldShow] = useState(false);
  const [editedPopupShouldShow, setEditedPopupShouldShow] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const notesRef = collection(db, 'notes');

  const onSubmitAddBtn = async (e) => {
    e.preventDefault();

    let noteTitle = title,
      noteDescription = description;
    if (noteTitle || noteDescription) {
      let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

      let noteInfo = {
        title: noteTitle,
        description: noteDescription,
        date: `${month} ${day}, ${year}`,
      };
      const user = JSON.parse(localStorage.getItem('user'));

      const data = [...notes, { ...noteInfo }];
      await setDoc(doc(notesRef, user?.email), {
        notes: data,
      });

      let alteredNotes = [...notes];
      alteredNotes.push(noteInfo);
      setpopupShouldShow(false);
      setNotes(alteredNotes);
      setTitle('');
      setDescription('');
    }
  };

  const getNotes = () => {
    
  }

  useEffect(() => {
    const tempUser = localStorage.getItem('user');

    if (!tempUser) {
      navigate('/');
    }
  }, []);
  const onAddBoxClick = () => {
    setpopupShouldShow(true);
  };
  const oncloseIconClick = () => {
    setpopupShouldShow(false);
  };
  const oncloseEditIconClick = () => {
    setEditedPopupShouldShow(false);
  };
  const onEditIconClick = (index) => {
    setEditedPopupShouldShow(true);
    setEditedTitle(notes[index].title);
    setEditedDescription(notes[index].description);
    setEditIndex(index);
  };
  const onEditButtonClick = (e) => {
    e.preventDefault();
    let alteredNotes = [...notes];
    let editedNote = {
      title: editedTitle,
      description: editedDescription,
    };
    alteredNotes[editIndex] = editedNote;
    setNotes(alteredNotes);
    setEditIndex(null);
    setEditedTitle('');
    setEditedDescription('');
    setEditedPopupShouldShow(false);
  };
  const onDeleteButtonClick = (index) => {
    let alteredNotes = [...notes];
    let deleted = alteredNotes.splice(index, 1);
    if (window.confirm(`Are you sure you want to remove ${deleted[0].title}`)) {
      setNotes(alteredNotes);
      console.log(deleted);
    }
  };

  return (
    <div className="bg-blue-300 border-yellow-300 border-4 h-auto sm:border-black sm:border-10">
      <div
        className={`${
          popupShouldShow ? '' : 'opacity-0 pointer-events-none'
        } popup-box fixed top-0 left-0 z-10 bg-opacity-40 bg-black h-screen w-screen flex justify-center items-center`}
      >
        <div className="popup bg-yellow-300 sm:bg-blue-200 border-4 rounded sm:rounded-lg border-black p-4 max-w-sm">
          <header className="flex justify-between py-4 sm:py-5 sm:px-7 px-6 border-b-2 border-gray-200">
            <p>Add a New Note</p>
            <img
              className=" close-icon cursor-pointer w-8 text-gray-500"
              src={cancel}
              alt=""
              onClick={() => {
                oncloseIconClick();
              }}
            />
          </header>
          <form className="py-4 pr-6 pl-9">
            <div className="row title pb-5   ">
              <label htmlFor="title" className="block text-lg pb-1">
                Title
              </label>
              <input
                className="w-[100%] h-12 outline-none text-2xl py-0 px-4 rounded border-2 border-blue-400"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="row description">
              <label htmlFor="description pb-4" className="block text-lg pb-1">
                Description
              </label>
              <textarea
                className="w-[100%] py-2 px-4 resize-none h-37  outline-none text-base rounded border-2 border-blue-400"
                name="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <button
              className="add-btn w-[100%] h-12 outline-none bg-blue-300 cursor-pointer text-base rounded text-white sm:border-black sm:border-8"
              type="button"
              onClick={(e) => {
                onSubmitAddBtn(e);
              }}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
      <button
        type="button"
        className="sm:border-2 border-blue-400 bg-black text-blue-400  sm:w-[10%] text-center sm:float-right  p-4 w-50%"
      >
        <Link to="/">Sign-out</Link>
      </button>
      <div className="p-8 list-none sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:gap-10  ">
        <li
          className="add-box bg-white h-72 rounded-md px-5 py-4 flex justify-center items-center flex-col gap-8 sm:gap-2"
          onClick={() => {
            onAddBoxClick();
          }}
        >
          <div className=" rounded-full border-blue-300 border-dashed border-8 cursor-pointer ">
            <img className="p-4" src={addi} alt="" />
          </div>
          <p className="text-blue-300 text-3xl italic sm:oblique">
            Add new note
          </p>
        </li>
        <div>
          {notes.map((note, index) => {
            return (
              <li key={index} className="bg-white h-72 rounded-md px-5 py-4">
                <div
                  className={`${
                    editedPopupShouldShow ? '' : 'opacity-0 pointer-events-none'
                  } popup-box fixed top-0 left-0 z-10 bg-opacity-40 bg-black h-screen w-screen flex justify-center items-center`}
                >
                  <div className="popup bg-yellow-300 sm:bg-blue-200 border-4 rounded sm:rounded-lg border-black p-4 max-w-sm">
                    <header className="flex justify-between py-4 sm:py-5 sm:px-7 px-6 border-b-2 border-gray-200">
                      <p>Edit this note</p>
                      <img
                        className=" close-icon cursor-pointer w-8 text-gray-500"
                        src={cancel}
                        alt=""
                        onClick={() => {
                          oncloseEditIconClick();
                        }}
                      />
                    </header>
                    <form className="py-4 pr-6 pl-9">
                      <div className="row title pb-5   ">
                        <label htmlFor="title" className="block text-lg pb-1">
                          Title
                        </label>
                        <input
                          className="w-[100%] h-12 outline-none text-2xl py-0 px-4 rounded border-2 border-blue-400"
                          type="text"
                          value={editedTitle}
                          onChange={(e) => {
                            setEditedTitle(e.target.value);
                          }}
                        />
                      </div>
                      <div className="row description">
                        <label
                          htmlFor="description pb-4"
                          className="block text-lg pb-1"
                        >
                          Description
                        </label>
                        <textarea
                          className="w-[100%] py-2 px-4 resize-none h-37  outline-none text-base rounded border-2 border-blue-400"
                          name="text"
                          value={editedDescription}
                          onChange={(e) => {
                            setEditedDescription(e.target.value);
                          }}
                        ></textarea>
                      </div>
                      <button
                        className="add-btn w-[100%] h-12 outline-none bg-blue-300 cursor-pointer text-base rounded text-white sm:border-black sm:border-8"
                        type="button"
                        onClick={(e) => {
                          onEditButtonClick(e);
                        }}
                      >
                        Edit Note
                      </button>
                    </form>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-3xl font-semibold">{note.title}</p>
                  <span className="text-gray-400 font-medium text-xl">
                    {note.description}
                  </span>
                </div>
                <div className="flex justify-between py-8 ">
                  <span className=" font-medium text-gray-700 border-t-4 border-yellow-300 sm:border-b-4 sm:border-blue-300"></span>
                  <div className="settings relative cursor-pointer">
                    <img className="w-10" src={ellipsis} alt=" " />
                    <ul className="menu sm:flex sm:flex-row absolute bottom-0 py-1 px-0 bg-white rounded scale-0 origin-bottom-right hover:bg-blue-200 sm:py-6 -right-1 shadow-black shadow transition-transform duration-300 ease-in-out hover:scale-100">
                      <li
                        onClick={() => {
                          onEditIconClick(index);
                        }}
                      >
                        <img src={editpencil} alt="" />
                      </li>
                      <li
                        onClick={() => {
                          onDeleteButtonClick(index);
                        }}
                      >
                        <img src={bin} alt="" />
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
