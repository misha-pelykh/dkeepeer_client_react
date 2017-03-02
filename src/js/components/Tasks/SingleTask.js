import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';
import { fetchTask }        from '../../actions/tasks';

@connect(state => ({
  task: state.tasks.task
}), {
  fetchTask
})
export default class SingleTask extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired
  }

  static fillStore(redux, props) {
    if (props.params.id) {
      return redux.dispatch(fetchTask(props.params.id));
    }
  }

  render() {
    const { task } = this.props;

    if (!task) return null;

    const { title, description, user_id } = task;

    return (
      <div>
        <div>{title}</div>
        <p>{description}</p>
        <small>written by {user_id}</small>
        <div>
          <Link to={`/admin/task/${task.id}/edit`}>
            Edit task
          </Link>
        </div>
      </div>
    );
  }
}
