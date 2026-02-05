"use client"
export default function Button({ onClick, children, disabled = false, type = "submit", className = "", ...props }) {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled}
            className={`
                w-[80px] h-[72px] gap-[10px] pt-[20px] pr-[24px] pb-[20px] pl-[24px] 
                rounded-[92px] border-2 border-[#4D4D4D80] 
                transition-all duration-300
                ${disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:border-[#FF4E21] hover:scale-105'
                }
                ${className}
            `} 
            style={{
                background: 'linear-gradient(146.55deg, #3C3C3C -7.85%, #070809 52.7%)',
            }}
            {...props}
        >
            {children}
        </button>
    )
}