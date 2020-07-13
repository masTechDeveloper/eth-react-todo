import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    return (
      <div id='content'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.createTask(this.task.value);
          }}
        >
          <input
            id='newTask'
            ref={(input) => (this.task = input)}
            type='text'
            className='form-control'
            placeholder='Add task...'
            required
          />
          <input type='submit' className='btn btn-block btn-info my-3' />
        </form>
        <ul id='taskList' className='list-unstyled'>
          {this.props.tasks.map((task, key) => {
            return (
              <div className='taskTemplate' className='checkbox' key={key}>
                <label>
                  <input
                    className='checkbox mr-2'
                    type='checkbox'
                    name={task.id}
                    defaultChecked={task.completed}
                    ref={(i) => {
                      this.checkbox = i;
                    }}
                    onClick={
                      (e) =>
                        // task id Bux Here
                        //   this.props.toggleCompleted(this.checkbox.name)
                        //   console.log('task', this.checkbox.name)

                        // Bug Fixed
                        this.props.toggleCompleted(task.id)
                      //   console.log('Task Id: ', task.id)
                    }
                  />
                  <span className='content'>{task.content}</span>
                </label>
              </div>
            );
          })}
        </ul>
        <ul id='completedTaskList' className='list-unstyled'></ul>
      </div>
    );
  }
}

export default TodoList;
