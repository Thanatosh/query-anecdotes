import React, { createContext, useReducer, useContext } from 'react'

const initialState = {
  message: '',
  visible: false
}

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.payload,
        visible: true
      }
    case 'HIDE_NOTIFICATION':
      return {
        message: '',
        visible: false
      }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const showNotification = (message, timeout) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, timeout * 1000);
  }

  return (
    <NotificationContext.Provider value={{ state, dispatch, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)