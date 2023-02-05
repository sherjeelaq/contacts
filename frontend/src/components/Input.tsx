import React from 'react'

interface InputProps {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputClassName?: string
  containerClassName?: string
  testId?: string
}
function Input({
  label,
  onChange,
  type,
  value,
  containerClassName,
  inputClassName,
  placeholder,
  testId
}: InputProps) {
  return (
    <div
      className={`w-full ${
        containerClassName ? containerClassName : ''
      }`}
    >
      <p className="text-xs text-custom-white-56">{label}</p>
      <input
        className={`mt-1 py-2 px-3 h-10 w-full rounded-lg text-sm text-white bg-custom-gray-80 focus:bg-custom-gray-60 border-[0.0625rem] border-custom-gray-60 hover:border-custom-gray-30 focus:border-custom-gray-10 placeholder:text-custom-white-32 ${
          inputClassName ? inputClassName : ''
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testId}
      />
    </div>
  )
}

export default Input
