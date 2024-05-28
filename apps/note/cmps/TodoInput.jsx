
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function TodoInput({ value, onChange, onFocus, name }) {
    return (
        <input
            className="input-new-todo"
            type="text"
            onChange={onChange}
            onFocus={onFocus}
            placeholder="New todo..."
            value={value}
            name={name} 
        />
    );
}