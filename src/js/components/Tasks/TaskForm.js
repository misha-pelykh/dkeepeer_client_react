import React, { PropTypes } from 'react';

export default class TaskForm extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    
    this.state = {
      task: { ...props.task }
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      task: {
        ...newProps.task
      }
    });
  }

  handleSave = e => {
    e.preventDefault();
    const { task } = this.state;
    this.props.onSave(task);
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ ['task']: {
      ...this.state.task,
      [field]: e.target.value
    } });
  }

  render() {
    const { title, description, priority, due_date } = this.state.task;

    return(
      <form onSubmit={this.handleSave}>
        <div className="form-group">
          <label htmlFor="inputTitle" className="control-label">
            Title
          </label>
          <input
            className="form-control"
            id="inputTitle"
            onChange={this.handleChange('title')}
            placeholder="Title"
            type="text"
            value={title}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputDescription" className="control-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="inputDescription"
            onChange={this.handleChange('description')}
            placeholder="Description goes here"
            rows="6"
            value={description}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPriority" className="control-label">
            Priority
          </label>
          <input
            className="form-control"
            id="inputPriority"
            onChange={this.handleChange('priority')}
            placeholder="Priority"
            type="number"
            value={priority}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="inputDueDate" className="control-label">
            Due date
          </label>
          <input
            className="form-control"
            id="inputDueDate"
            onChange={this.handleChange('due_date')}
            placeholder="Due date"
            type="text"
            value={due_date}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Create Task
        </button>
      </form>
    );
  }
}
