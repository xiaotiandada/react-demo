import React from 'react'
import AddTodoContainer from "../containers/AddTodoContainer";
import VisibleTodoList from "../containers/VisibleTodoList";
import Footer from "./Footer";


const App = () => (
    <section style={{ margin: '40px' }}>
        <h1>Todo List</h1>
        <AddTodoContainer></AddTodoContainer>
        <VisibleTodoList></VisibleTodoList>
        <Footer></Footer>
    </section>
)


export default App;