import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const LIMIT = 5

  // Accept a signal parameter to allow request cancellation
  const fetchData = async (signal) => {
    try {
      const result = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`,
        { signal } // Pass the abort signal to axios
      );

      // result.data is already limited to 5 by the API, no need to .slice()
      setData(prev => [...prev, ...result.data.slice(0, 5)]);
    } catch (error) {
      // Ignore errors caused by intentional cancellation
      if (axios.isCancel(error)) {
        console.log("Fetch aborted");
      } else {
        console.error("Error fetching data: ", error);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    // Cleanup function: runs when component unmounts or page changes
    return () => {
      controller.abort();
    };
  }, [page]) // Fires whenever page changes

  return (
    <div className="main min-h-screen bg-stone-900 text-stone-200">
      <h1 className='text-center text-2xl py-4'>Sample Gallery project</h1>
      <section className='p-4 container mx-auto'>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-10'>
          {data.map((item, index) => (
            // Combining item.id with index ensures keys are absolutely unique 
            // even if StrictMode temporarily duplicates state in dev
            <div key={`${item.id}-${index}`} className='card rounded-md bg-white p-2 transition duration-300 ease-in-out'>
              <img className='rounded-md h-36 object-cover w-full' src={item.download_url} alt={item.author} />
              {/* Changed text color to stone-800 so it's readable on the white card background */}
              <h2 className='text-stone-800 font-medium mt-2'>{item.author}</h2>
            </div>
          ))}
        </section>

        <button
          className='bg-amber-500 border border-transparent rounded-md text-white px-4 py-2 hover:bg-amber-600 cursor-pointer block mx-auto'
          onClick={() => setPage(prev => prev + 1)}
        >
          Load More
        </button>
      </section>
    </div>
  )
}

export default App