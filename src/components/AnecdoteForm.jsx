import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: () => {
      showNotification('Anecdote too short, must be length of 5 or more', 5)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    showNotification(`New anecdote created: ${content}`, 5)
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
