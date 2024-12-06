import React from "react";
import PropTypes from "prop-types";

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "light-outline",
        "white-outline",
    ]),
    processing: PropTypes.bool,
    children: PropTypes.node,
};

export default function Button({
    type = "submit",
    className = "",
    variant = "primary",
    processing,
    children,
}) {
    const widthClass = className.includes("w-") ? "" : "w-full";

    return (
        <button
            type={type}
            className={`rounded-2xl py-[13px] text-center ${widthClass} ${processing && "opacity-30"
                } btn-${variant} ${className}`}
            disabled={processing}
        >
            {children}
        </button>
    );
}