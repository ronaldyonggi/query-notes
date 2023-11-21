import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../requests"

const NoteForm = () => {
    const queryClient = useQueryClient()

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

    return (
        <div>
            <form onSubmit={addNote}>
                <input name='note' />
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default NoteForm