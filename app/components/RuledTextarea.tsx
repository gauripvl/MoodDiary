'use client'

import { TextareaHTMLAttributes } from 'react'

interface RuledTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function RuledTextarea({ value, onChange, ...props }: RuledTextareaProps) {
  return (
    <div className="relative w-full h-80">
      {/* Margin line (left red line like in notebooks) */}
      <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-300 z-10 pointer-events-none" />
      
      {/* Ruled lines background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            transparent,
            transparent 31px,
            #e5e7eb 31px,
            #e5e7eb 32px
          )`,
          backgroundPosition: '0 8px'
        }}
      />
      
      {/* Textarea */}
      <textarea
        value={value}
        onChange={onChange}
        {...props}
        className="w-full h-full p-6 pl-16 text-xl bg-transparent resize-none focus:outline-none relative z-20 cursive-font text-gray-800"
        style={{ 
          lineHeight: '32px',
          backgroundImage: 'none'
        }}
      />
    </div>
  )
}

