import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './App.css'
import { getNotes } from './requests'
import NoteForm from './components/NoteForm'
import Note from './components/Note'

function App() {
  // ========================== DISPLAY NOTES =====================

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  // console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <NoteForm />

      {notes.map(note => 
        <Note key={note.id} note={note}/>
        )}
    </div>
  )
}

export default App
