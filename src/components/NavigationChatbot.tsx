import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface NavigationChatbotProps {
  onNavigateToJobSeeker: () => void;
  onNavigateToEmployer: () => void;
}

const NavigationChatbot: React.FC<NavigationChatbotProps> = ({
  onNavigateToJobSeeker,
  onNavigateToEmployer
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi there! I'm your TalentConnect Navigation Assistant. I can help you find the right section based on your needs. Are you looking to find a job or hire talent?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI('AIzaSyAg_f8hotQJoJlLj6uTd0QdVGu04vj3buI');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const element = document.querySelector('.chatbot-container');
        element?.classList.add('chatbot-pop');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const quickActions = [
    { text: "I'm looking for a job", action: 'job-seeker' },
    { text: "I want to hire talent", action: 'employer' },
    { text: "Tell me about your features", action: 'features' }
  ];

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || inputMessage;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const prompt = `
        You are a helpful navigation assistant for TalentConnect, a recruitment platform.

        Your role is to:
        1. Help users decide whether they should go to the Job Seeker section or the Employer section
        2. Provide brief, friendly guidance (2-3 sentences max)
        3. If they're looking for a job, mention they can access AI Resume Builder, Resume Rating, and AI Career Assistant
        4. If they're hiring, mention they can post jobs with AI Job Description Generator and use Salary Benchmarking

        User's message: ${messageToSend}

        Respond in a friendly, concise way. If they indicate they want to find a job, recommend the Job Seeker section.
        If they want to hire or post jobs, recommend the Employer section.
        Keep responses under 50 words.
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botResponse = response.text();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm having trouble right now. But I can still help! Are you looking to find a job or hire talent?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string, text: string) => {
    if (action === 'job-seeker') {
      const message: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: text,
        timestamp: new Date()
      };
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Perfect! I'll take you to the Job Seeker section where you can browse jobs, build your resume with AI, get resume ratings, and chat with our AI Career Assistant.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message, botMessage]);
      setTimeout(() => {
        onNavigateToJobSeeker();
        setIsOpen(false);
      }, 1500);
    } else if (action === 'employer') {
      const message: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: text,
        timestamp: new Date()
      };
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Great! I'll take you to the Employer section where you can post jobs with AI-generated descriptions, view candidates, and analyze salary competitiveness.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message, botMessage]);
      setTimeout(() => {
        onNavigateToEmployer();
        setIsOpen(false);
      }, 1500);
    } else {
      sendMessage(text);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 animate-bounce"
          aria-label="Open navigation assistant"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          <div className="chatbot-container fixed bottom-6 right-6 w-[90vw] sm:w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-blue-100">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Navigation Assistant</h3>
                  <p className="text-xs text-blue-100">Here to help you navigate</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-blue-600'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                    }`}>
                      {message.type === 'bot' ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-white text-xs font-bold">U</span>
                      )}
                    </div>

                    <div className={`rounded-2xl px-4 py-2 shadow-sm ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="flex flex-col space-y-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.action, action.text)}
                      className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg text-left text-sm text-gray-700 hover:from-blue-100 hover:to-cyan-100 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span>{action.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        .chatbot-container {
          animation: slideUp 0.3s ease-out;
        }

        .chatbot-pop {
          animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </>
  );
};

export default NavigationChatbot;
