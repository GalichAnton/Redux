import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { FC, useReducer, useState } from 'react';
import { ITask, reducer } from './reducer';
import './App.css';

const initialState: ITask[] = [{
  id: 1,
  text: 'Сделать что-то',
  completed: false
}]

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isAllCompleted, setIsAllCompleted] = useState(false)
  const [taskTab, setTasksTab] = useState('all')
  const addTask = (task: ITask) => {
    dispatch({
      type: 'ADD_TASK',
      payload: task
    })
  }

  const completeTask = (id: number): void => {
    dispatch({
      type: 'COMPLETE_TASK',
      payload: { id }
    })
  }

  const onDelete = (id: number): void => {
    if (window.confirm('Вы точно хотите удалить задачу?')) {
      dispatch({
        type: 'DELETE_TASK',
        payload: { id }
      })
    }
  }

  const deleteAll = () => {
    dispatch({
      type: 'DELETE_ALL'
    })
  }

  const changeAllStatus = () => {
    dispatch({
      type: 'CHANGE_ALL',
      payload: isAllCompleted
    })
    setIsAllCompleted(!isAllCompleted)
  }

  const setTabValue = (tab:string) => {
    return tab === 'all' ? 0 : tab === 'active' ? 1 : tab === 'complete' ? 2 : 0
  }

  return (
    <div className="App" >
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs value={setTabValue(taskTab)}>
          <Tab onClick={() => setTasksTab('all')} label="Все" />
          <Tab onClick={() => setTasksTab('active')} label="Активные" />
          <Tab onClick={() => setTasksTab('complete')} label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {taskTab === 'all' && state.map((item) => (
            <Item key={item.id} task={item} onComplete={completeTask} onDelete={onDelete} />
          ))}
          {taskTab === 'active' && state.map((item) => (
            !item.completed && <Item key={item.id} task={item} onComplete={completeTask} onDelete={onDelete} />
          ))}
          {taskTab === 'complete' && state.map((item) => (
            item.completed && <Item key={item.id} task={item} onComplete={completeTask} onDelete={onDelete} />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={changeAllStatus}>{isAllCompleted ? 'Отметить всё' : 'Снять все отметки'}</Button>
          <Button onClick={deleteAll}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
