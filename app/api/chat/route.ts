import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const supabase = createClient()
  const { message, sessionId } = await req.json()

  // Generate a new session ID if not provided
  const currentSessionId = sessionId || uuidv4()

  try {
    // Call Langflow API
    const response = await fetch(process.env.LANGFLOW_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LANGFLOW_API_KEY}`
      },
      body: JSON.stringify({
        input_value: message,
        output_type: "chat",
        input_type: "chat",
        session_id: currentSessionId,
        tweaks: {
          "OpenAIToolsAgent-OP1ux": {},
          "WikipediaAPI-QhPyc": {},
          "YFinanceTool-iDRBv": {},
          "PythonREPLTool-Cjlxh": {},
          "OpenAIModel-3T7xc": {},
          "Prompt-ImAvU": {},
          "ChatInput-d8Jn1": {},
          "ChatOutput-T0F0D": {}
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to fetch from Langflow API')
    }

    const data = await response.json()

    // Extract the AI's response
    const aiMessage = data.outputs[0].outputs[0].results.message.text

    // Save the conversation in Supabase
    const { data: user } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('messages').insert([
        { session_id: currentSessionId, user_id: user.user.id, sender: 'user', content: message },
        { session_id: currentSessionId, user_id: user.user.id, sender: 'ai', content: aiMessage }
      ])
    }

    return NextResponse.json({ message: aiMessage, sessionId: currentSessionId })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}