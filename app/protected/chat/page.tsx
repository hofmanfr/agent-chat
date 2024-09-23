'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, PaperAirplaneIcon, SparklesIcon, PlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
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

const GlowingButton = ({ children, onClick, className = '', fullWidth = false }) => (
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    fetchChatSessions()
  }, [])

  const fetchChatSessions = async () => {
    const { data: sessions, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching chat sessions:', error)
    } else {
      setChatSessions(sessions)
    }
  }

  const handleSendMessage = async () => {
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
          await supabase
            .from('chat_sessions')
            .update({ lastMessage: inputMessage, date: new Date().toISOString() })
            .eq('id', currentSessionId)
        }

        await fetchChatSessions()
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleNewChat = async () => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ title: 'New Chat', lastMessage: 'Start a new conversation', date: new Date().toISOString() })
      .select()

    if (error) {
      console.error('Error creating new chat session:', error)
    } else {
      setCurrentSessionId(data[0].id)
      setMessages([])
      await fetchChatSessions()
    }
  }

  const handleSelectSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId)
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
    } else {
      setMessages(messages)
    }
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
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors relative overflow-hidden group"
                    onClick={() => handleSelectSession(session.id)}
                  >
                    <h3 className="font-medium text-white">{session.title}</h3>
                    <p className="text-sm text-gray-300 truncate">{session.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(new Date(session.date))}</p>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </motion.div>
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
    </div>
  )
}