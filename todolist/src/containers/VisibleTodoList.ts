import { connect } from "react-redux";
import { toggleTodo, VisibilityFilters } from "../actions";
import TodoList from "../components/TodoList";

interface todo {
    completed: boolean
}

const getVisibleTodos = (todos: any, filter: any) => {
    switch(filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter((i: todo) => i.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter((i: todo) => !i.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

const mapStateToProps = (state: { todos: [], filter: string }) => ({
    todos: getVisibleTodos(state.todos, state.filter)
})

const mapDispatchToProps = (dispatch: any) => ({
    toggleTodo: (id: number) => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)