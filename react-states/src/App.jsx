import { useState } from 'react'

function App() {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [notes, setNotes] = useState([])

  const addNote = (e) => {
    e.preventDefault()
    setNotes(prev => [...prev, { id: notes.length, title, desc }])
    setTitle("")
    setDesc("")
  }

  const deleteNote = (e) => {
    setNotes(prev => prev.filter((elem) => elem.id != e))
  }

  return (
    <main className='bg-mauve-600 min-h-screen p-10'>
      <div>
        <form className='flex flex-col gap-3 w-2xl' onSubmit={addNote}>
          <input
            name='task-title'
            id=''
            className='bg-white rounded-md p-3 overflow-hidden'
            type="text"
            placeholder='Type title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            id=""
            className='bg-white rounded-md px-4 py-2 overflow-hidden'
            placeholder='type description'
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button type="submit" className='border-2 border-white hover:bg-white rounded-md py-3'>Add Note</button>
        </form>
      </div>
      <div className='flex my-3 gap-5'>

        {notes.length ? notes.map((e, i) => (<div key={i} className="card bg-amber-700 rounded-md p-2 max-w-xl w-full flex flex-col justify-between">
          <h1 className='mb-3'>{e.title}</h1>
          <p className=''>{e.desc}</p>
          <button onClick={() => deleteNote(e.id)} className='text-sm bg-white'>Delete Note</button>
        </div>)) : <p>No tasks yet</p>
        }

      </div>
    </main>
  )
}

export default App
