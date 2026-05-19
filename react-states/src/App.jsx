import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : []
  })

  const addNote = (e) => {
    e.preventDefault()
    setNotes(prev => [...prev, { id: Date.now(), title, desc }])
    setTitle("")
    setDesc("")
  }

  const deleteNote = (e) => {
    if (confirm("Are you really need to delete this note?")) {
      setNotes(prev => prev.filter((elem) => elem.id != e))
    } else {

    }
  }

  const apiCall = async () => {
    // console.log("dhichikdhichik")
    // const result = fetch("https://jsonplaceholder.typicode.com/todos")
    // result.then(response => response.json()).then(response => console.log(response))
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log(response.data)
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))

  }, [notes])

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      setNotes(JSON.parse(saved))
    }
  }, [])


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
            className='bg-white rounded-md px-4 py-2 overflow-scroll resize-none'
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
          <button onClick={apiCall}>Get API data</button>
        </div>)) : <p>No tasks yet</p>
        }

      </div>
    </main>
  )
}

export default App
