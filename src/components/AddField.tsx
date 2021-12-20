import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, ChangeEvent, FC } from 'react';
import { ITask } from '../reducer';

interface IProp {
  onAdd: (task: ITask) => void
}

export const AddField: FC<IProp> = ({ onAdd }) => {

  const [taskState, setTaskState] = useState<ITask>({
    id: 1,
    text: '',
    completed: false
  })

  const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskState({
      ...taskState,
      text: e.currentTarget.value
    })
  }
  const onCheckBoxClick = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskState({
      ...taskState,
      completed: e.currentTarget.checked
    })
  }

  const clearTask = () => {
    setTaskState({
      id: taskState.id,
      text: '',
      completed: false
    })
  }

  const addTask = () => {
    if (taskState.text) {
      onAdd(taskState)
      clearTask()
    } else {
      alert('Введите задачу')
    }
  }

  return (
    <div className="field">
      <Checkbox
        onChange={onCheckBoxClick}
        checked={taskState.completed}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField placeholder="Введите текст задачи..." variant="standard" fullWidth value={taskState.text} onChange={onChangeInput} />
      <Button onClick={addTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
