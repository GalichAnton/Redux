//Забыл сделать первый пуш с чистым проектом соре(
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { FC, useReducer } from 'react';
import { ITask, reducer } from './reducer';
import './App.css';

const initialState: ITask[] = [{
  id: 1,
  text: 'Сделать что-то',
  completed: false
}]

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addTask = (task: ITask) => {
    dispatch({
      type: 'ADD_TASK',
      payload: task
    })
  }

  const completeTask = (id: number): void => {
    dispatch({
      type: 'COMPLETE_TASK',
      payload: {id}
    })
  }
  
  const onDelete = (id: number): void => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {id}
    })
  }

  return (
    <div className="App" >
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((item) => (
            <Item key={item.id} task={item} onComplete={completeTask} onDelete={onDelete}/>
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
