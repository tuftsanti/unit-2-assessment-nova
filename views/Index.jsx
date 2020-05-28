const React = require('react')

class Index extends React.Component {
    render() {
        const {todos} = this.props;
        return (
            <>
                <h1>To Do List</h1><br/>
                {/* <h2>list start{this.props.todos.todo}</h2> */}
                <ul> 
                    {
                    todos ?                     
                    todos.map((todo, index) => {
                         return (
                            <li>
                                <h2>{todo.todo} 
                                    {(todo.isDone) ? ` - Done` : ` - Not Done`}
                                    <form action={`/${index}?_method=DELETE`} method="POST">
                                        <input type="submit" value="DELETE"/>
                                    </form>
                                </h2>
                            </li>
                            )
                        })
                        : <h2>There are no To Dos yet!</h2>
                    }
                    <form action="/" method="POST">
                        <input type="text" name="todo" />
                        <input type="submit" value="ADD TO DO"/>
                    </form>
                </ul>
            </>
        )
    }
}

module.exports = Index;