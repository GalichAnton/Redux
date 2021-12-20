import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ITask } from '../reducer';
import { FC } from 'react';

interface IProps {
  task:ITask
  onComplete: (id:number)=> void
  onDelete: (id:number)=> void
}

export const Item:FC<IProps> = ({task,onComplete,onDelete}) => {
  return (
    <ListItem onClick={()=>onComplete(task.id)}> {/* блин час сидел думал как айдишник передать, оказывается все так просто)) */} 
      <div className="d-flex item">
        <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} checked={task.completed} />
        <Typography className="item-text">{task.text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={()=>onDelete(task.id)}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
