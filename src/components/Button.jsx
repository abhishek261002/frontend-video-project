import React from "react";

export default function Button({
    children,
    rounded = "rounded-2xl",
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`lg:px-4 lg:py-2 ${rounded} ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}