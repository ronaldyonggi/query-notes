import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './App.css'
import { getNotes, createNote, updateNote } from './requests'

function App() {
  const queryClient = useQueryClient()

  // ========================== ADDING NEW NOTE =====================
  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      // queryClient.invalidateQueries({ queryKey: ['notes']})
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  // ========================== TOGGLE NOTE IMPORTANCE =====================

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (changedNote) => {
      const notes = queryClient.getQueryData(['notes'])
      const mutatedNotes = notes.map(n => n.id === changedNote.id ? changedNote : n)
      queryClient.setQueryData(['notes'], mutatedNotes)
      // queryClient.invalidateQueries({ queryKey: ['notes']})
    }
  })

  const toggleImportance = note => {
    updateNoteMutation.mutate({...note, important: !note.important})
  }


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
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>

      {notes.map(note => 
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} | 
          <strong>{ note.important ? 'important' : 'not important'}</strong>
          |
        </li>
        )}
    </div>
  )
}

export default App
