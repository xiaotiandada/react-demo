import React from 'react'

const AddTodo = ({ addTodo }) => {
    let input = null
    return (
        <form onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
                return
            }
            addTodo(input.value.trim())
            input.value = ''
        }}>
            <input ref={ n => input = n } type="text"/><button type="submit">Add Todo</button>
        </form>
    )
}

export default AddTodo