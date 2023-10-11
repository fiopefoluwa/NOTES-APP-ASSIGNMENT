import React from 'react'
import './home.css'

const Home = () => {
    const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    closeIcon = popupBox.querySelector(".close-icon"),
    titleTag = popupBox.querySelector("input"),
    descriptionTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button")
    
        const  months = ["January", "February", "March", "April", "May",
                        "June", "July", "August", "September", "October",
                        "November", "December"]

    addBox.addEventListener("click", () => {
        popupBox.classList.add("show")
    });
    closeIcon.addEventListener("click", () => {
        popupBox.classList.remove("show")
    });
    addBtn.addEventListener("click", e => {
        e.preventDefault();
        let noteTitle = titleTag.value,
        noteDescription = descriptionTag.value;

        if(noteTitle || noteDescription) {
            let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

            let noteInfo = {
                title: noteTitle, description:noteDescription,
                date: `${month} ${day}, ${year}`
            }
            const notes = [];
            notes.push(noteInfo)
            closeIcon.click();
            // console.log("month, day, year")
    }
    })


    return (
      <div className='bg-blue-300 border-yellow-300 border-4 h-auto sm:border-black sm:border-10'>
          <div className="popup-box opacity-0 pointer-events-none fixed top-0 left-0 z-10 bg-opacity-40 bg-black h-screen w-screen flex justify-center items-center">
            <div className="popup bg-yellow-300 sm:bg-blue-200 border-4 rounded sm:rounded-lg border-black p-4 max-w-sm" >
              <header className='flex justify-between py-4 sm:py-5 sm:px-7 px-6 border-b-2 border-gray-200'>
                <p>Add a New Note</p>
                <img className=' close-icon cursor-pointer w-8 text-gray-500' src="../src/images/icons8-cancel-48.png" alt=""  /> 
              </header>
              <form className='py-4 pr-6 pl-9'>
                <div className="row title pb-5   ">
                  <label htmlFor="title" className='block text-lg pb-1'>Title</label>
                  <input
                    className='w-[100%] h-12 outline-none text-2xl py-0 px-4 rounded border-2 border-blue-400'
                    type="text"
                  />
                </div>
                <div className="row description">
                  <label htmlFor="description pb-4" className='block text-lg pb-1'>Description</label>
                  <textarea
                    className='w-[100%] py-2 px-4 resize-none h-37  outline-none text-base rounded border-2 border-blue-400'
                    name="text"
                  ></textarea>
                </div>
                <button
                  className='w-[100%] h-12 outline-none bg-blue-300 cursor-pointer text-base rounded text-white sm:border-black sm:border-8'
                  type="button"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
                  <div className='p-8 list-none grid grid-cols-2 grid-rows-3 gap-10 '>
          <li className=' add-box bg-white h-72 rounded-md px-5 py-4 flex justify-center items-center flex-col gap-8 sm:gap-2'>
            <div className=' rounded-full border-blue-300 border-dashed border-8 cursor-pointer ' >
              <img className='p-4' src="../src/images/icons8-add-note-96.png" alt="" />
            </div>
            <p className='text-blue-300 text-3xl italic sm:oblique'>Add new note</p>
          </li>
            <li  className='bg-white h-72 rounded-md px-5 py-4 '>
              <div className='flex flex-col gap-6'>
                <p className='text-3xl font-semibold'>Title</p>
                <span className='text-gray-400 font-medium text-xl'>Description</span>
              </div>
              <div className="flex justify-between py-8 ">
                <span className=' font-medium text-gray-700 border-t-4 border-yellow-300 sm:border-b-4 sm:border-blue-300'></span>
                <div className='settings relative cursor-pointer'>
                  <img className='w-10' src="../src/images/icons8-more-64.png" alt=" " />
                  <ul className='menu sm:flex sm:flex-row absolute bottom-0 py-1 px-0 bg-white rounded scale-0 origin-bottom-right hover:bg-blue-200 sm:py-6 -right-1 shadow-black shadow transition-transform duration-300 ease-in-out hover:scale-100'>
                    <li><img src="../src/images/icons8-pencil-64.png" alt="" />
                    </li>
                    <li><img src="../src/images/icons8-delete-48.png" alt="" />
                    </li>
                  </ul>
                </div>
              </div>
            </li>
        </div>
        
      </div>
    );
}

export default Home
