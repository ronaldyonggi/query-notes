import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateNote } from "../requests"

const Note = ({ note }) => {
    const queryClient = useQueryClient()
    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: (changedNote) => {
        const notes = queryClient.getQueryData(['notes'])
        const mutatedNotes = notes.map(n => n.id === changedNote.id ? changedNote : n)
        queryClient.setQueryData(['notes'], mutatedNotes)
        }
    })

    const toggleImportance = note => {
        updateNoteMutation.mutate({...note, important: !note.important})
    }

    return (
        <li key={note.id} onClick={() => toggleImportance(note)}>
            {note.content} | 
            <strong>{ note.important ? 'important' : 'not important'}</strong>
            |
        </li>
    )
}

export default Note