'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, PaperAirplaneIcon, SparklesIcon, PlusIcon, ArrowRightOnRectangleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type Message = {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

type ChatSession = {
  id: string
  title: string
  lastMessage: string
  date: Date
}

const GlowingButton = ({ children, onClick, className = '', fullWidth = false }: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  fullWidth?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group ${fullWidth ? 'w-full' : ''} ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></div>
  </button>
)

const formatDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    fetchChatSessions()
  }, [])

  const fetchChatSessions = async () => {
    console.log('Fetching chat sessions...')
    const { data: sessions, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching chat sessions:', error)
    } else {
      console.log('Fetched chat sessions:', sessions)
      setChatSessions(sessions)
    }
  }

  const handleSendMessage = async () => {
    console.log('Sending message:', inputMessage)
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputMessage('')

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: inputMessage,
            sessionId: currentSessionId,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        const data = await response.json()
        const aiResponse: Message = {
          id: messages.length + 2,
          text: data.message,
          sender: 'ai',
          timestamp: new Date(),
        }
        setMessages(prevMessages => [...prevMessages, aiResponse])

        // Update the chat session
        if (currentSessionId) {
          const sessionUpdate: { last_message: string; date: string; title?: string } = { 
            last_message: inputMessage, 
            date: new Date().toISOString() 
          }
          if (messages.length === 0) { // Check if it's the first message
            sessionUpdate.title = inputMessage.substring(0, 40)
          }
          const { error } = await supabase
            .from('chat_sessions')
            .update(sessionUpdate)
            .eq('id', currentSessionId)
          
          if (error) {
            console.error('Error updating chat session:', error)
          }
        }

        await fetchChatSessions()
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleNewChat = async () => {
    console.log('Creating new chat...')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.error('User not authenticated')
      return
    }

    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ user_id: user.id, title: 'New Chat', last_message: 'Start a new conversation', date: new Date().toISOString() })
      .select()

    if (error) {
      console.error('Error creating new chat session:', error)
    } else if (data) {
      console.log('New chat session created:', data[0])
      setCurrentSessionId(data[0].id)
      setMessages([])
      await fetchChatSessions()
    }
  }

  const handleSelectSession = async (sessionId: string) => {
    console.log('handleSelectSession called with sessionId:', sessionId)
    setCurrentSessionId(sessionId)
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
    } else if (messages) {
      console.log('Fetched messages:', messages)
      setMessages(messages.map(message => ({
        id: message.id,
        text: message.content,
        sender: message.sender,
        timestamp: new Date(message.timestamp)
      })))
    }
  }

  const handleDeleteSession = async (sessionId: string) => {
    setDeleteSessionId(sessionId)
  }

  const confirmDeleteSession = async () => {
    if (!deleteSessionId) return

    console.log('Deleting session:', deleteSessionId)
    try {
      // Delete messages associated with the session
      const { error: messagesError } = await supabase
        .from('messages')
        .delete()
        .eq('session_id', deleteSessionId)

      if (messagesError) {
        console.error('Error deleting messages:', messagesError)
        return
      }

      console.log('Messages deleted successfully')

      // Delete the session
      const { error: sessionError } = await supabase
        .from('chat_sessions')
        .delete()
        .eq('id', deleteSessionId)

      if (sessionError) {
        console.error('Error deleting chat session:', sessionError)
        return
      }

      console.log('Chat session deleted successfully')

      // Update the chat sessions list
      await fetchChatSessions()

      // Clear messages if the deleted session was the current session
      if (deleteSessionId === currentSessionId) {
        setMessages([])
        setCurrentSessionId(null)
        console.log('Cleared current session')
      }

      setDeleteSessionId(null)
    } catch (error) {
      console.error('Error deleting chat session:', error)
    }
  }

  const cancelDeleteSession = () => {
    setDeleteSessionId(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="flex h-screen w-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-gray-800 shadow-lg flex flex-col"
          >
            <div className="p-4 flex-1 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Chat History</h2>
              <GlowingButton onClick={handleNewChat} fullWidth className="mb-4">
                <PlusIcon className="h-5 w-5 mr-2" />
                New Chat
              </GlowingButton>
              <div className="space-y-4">
                {chatSessions.map(session => (
                  <div key={session.id} className="flex items-center space-x-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-3 bg-gray-700 rounded-lg relative overflow-hidden group cursor-pointer flex-grow"
                      onClick={() => {
                        console.log('Clicked on session:', session.id)
                        handleSelectSession(session.id)
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-grow">
                          <h3 className="font-medium text-white">{session.title}</h3>
                          <p className="text-sm text-gray-300 truncate">{session.lastMessage}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(new Date(session.date))}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </motion.div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('Delete button clicked for session:', session.id)
                        handleDeleteSession(session.id)
                      }}
                      className="p-2 rounded-md hover:bg-gray-600 transition-colors text-white"
                      aria-label="Delete chat"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors text-white"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">AI Research Assistant Chat</h1>
          </div>
          <GlowingButton onClick={handleLogout} className="px-3 py-1">
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            Sign Out
          </GlowingButton>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white ml-auto' 
                    : 'bg-gray-700 text-gray-100'
                } shadow-lg max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
                <div className="flex items-start">
                  {message.sender === 'ai' && (
                    <SparklesIcon className="h-5 w-5 mr-2 text-yellow-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-grow">
                    <p>{message.text}</p>
                    <p className="text-xs text-gray-400 mt-1 text-right">{formatTime(new Date(message.timestamp))}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>
        <footer className="bg-gray-800 p-4 shadow-lg">
          <div className="max-w-3xl mx-auto flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            <GlowingButton onClick={handleSendMessage} className="p-2" aria-label="Send message">
              <PaperAirplaneIcon className="h-6 w-6" />
            </GlowingButton>
          </div>
        </footer>
      </div>

      {/* Modal für Löschbestätigung */}
      {deleteSessionId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Delete Chat</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this chat? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDeleteSession}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSession}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}