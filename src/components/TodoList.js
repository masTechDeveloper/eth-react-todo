import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    return (
      <div id='content'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
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
              <div className='taskTemplate ' key={key}>
                <label>
                  <input type='checkbox' className='checkbox mr-2 ' />
                  <label className='content'>{task.content}</label>
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
