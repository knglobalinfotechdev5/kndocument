// StyledSpan.js
import React from 'react';

const StyledSpan = ({ text, color, contentEditable, styles, onInput }) => {
    return (
        <span
            contentEditable={contentEditable}
            style={{
                color: color,
                textDecoration: styles.textDecoration,
                fontWeight: styles.fontWeight,
                fontStyle: styles.fontStyle,
                backgroundColor: styles.backgroundColor,
                // You can add more styles here if needed
            }}
            onInput={onInput} // Trigger the input handler when editing
            suppressContentEditableWarning={true} // Prevent warnings for using contentEditable
        >
            {text}
        </span>
    );
};

export default StyledSpan;
