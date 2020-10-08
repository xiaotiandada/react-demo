let nextTodoId: number = 0;

export const VisibilityFilters = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE"
};

// TODO: id small bug
export const addTodo = (text: string) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text,
})

export const toggleTodo = (id: number) => ({
    type: 'TOGGLE_TODO',
    id
})

export const setVisibilityFilter = (filter: string) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})