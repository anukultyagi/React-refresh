import { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader } from 'lucide-react';

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const LIMIT = 10

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await axios.get(
          `https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`,
          { signal: controller.signal }
        );
        setData(result.data);
      } catch (error) {
        // Only log/handle errors if they weren't caused by an intentional abort
        if (!axios.isCancel(error)) {
          console.error("Error fetching data: ", error);
        }
      } finally {
        // Only clear loading state if the request wasn't aborted
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [page]) // Fires cleanly whenever page changes

  useEffect(() => {
   
  }, [])

  return (
    <div className="main min-h-screen bg-stone-900 text-stone-200 relative pb-16">
      <h1 className='text-center text-2xl py-6 font-bold tracking-wide'> Gallery with pagination </h1>

      {/* Fixed Full Screen Overlay Loader */}
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm'>
          <div className='flex flex-col items-center gap-2 bg-stone-800 p-6 rounded-xl shadow-xl border border-stone-700'>
            <Loader className='animate-spin text-amber-500 h-10 w-10' />
            <p className='text-sm text-stone-400 font-medium'>Loading gallery...</p>
          </div>
        </div>
      )}

      <main className='p-4 container mx-auto'>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-6'>
          {data.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className='card rounded-md bg-white p-2 transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg'
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img
                  className='rounded-md h-48 object-cover w-full bg-stone-200'
                  src={item.download_url}
                  alt={item.author}
                  loading="lazy"
                />
                <h2 className='text-stone-800 font-semibold mt-2 truncate text-sm px-1'>{item.author}</h2>
              </a>
            </div>
          ))}
        </section>

        {/* Clean, Side-By-Side Pagination Layout */}
        <div className='flex justify-center items-center gap-4 mt-10'>
          {page > 1 && (
            <button
              className='bg-amber-500 rounded-md text-white px-5 py-2 hover:bg-amber-600 transition font-medium cursor-pointer'
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
          )}

          <span className='text-stone-400 font-medium bg-stone-800 px-3 py-2 rounded-md border border-stone-700'>
            Page {page}
          </span>

          <button
            className='bg-amber-500 rounded-md text-white px-5 py-2 hover:bg-amber-600 transition font-medium cursor-pointer'
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </button>
          {
            page == 1 ?
              null : <button
                className='bg-amber-500 rounded-md text-white px-5 py-2 hover:bg-amber-600 transition font-medium cursor-pointer'
                onClick={() => setPage(1)}
              >
                Home
              </button>
          }
        </div>
      </main>
    </div >
  )
}

export default App