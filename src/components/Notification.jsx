import { useNotification } from "./NotificationContext"

const Notification = () => {
  const { state } = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: state.visible ? 'block' : 'none'
  }

  if (!state.message) return null

  return (
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification
