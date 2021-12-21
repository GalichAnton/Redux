
export interface ITask {
  id: number
  text: string
  completed: boolean
}

export interface IAddTask {
  type: 'ADD_TASK'
  payload: ITask
}

export interface ICompletedTask {
  type: 'COMPLETE_TASK'
  payload: {
    id: number
  }
}

export interface IDeleteTask {
  type: 'DELETE_TASK'
  payload: {
    id: number
  }
}
export interface IDeleteAllTasks {
  type: 'DELETE_ALL'
}

export interface IChangeStatus {
  type: 'CHANGE_ALL'
  payload:boolean
}

type ActionType = IAddTask | ICompletedTask | IDeleteTask | IDeleteAllTasks | IChangeStatus

export const reducer = (state: ITask[], action: ActionType) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: state[state.length - 1]?.id ? state[state.length - 1].id + 1 : 1,
          text: action.payload.text,
          completed: action.payload.completed
        }
      ]
    case 'COMPLETE_TASK':
      return [...state].map((task) => {
        if (task.id === action.payload.id) {
          task.completed = !task.completed
        }
        return task
      })
    case 'DELETE_TASK':
      return [...state].filter((task) => task.id !== action.payload.id)
    case 'DELETE_ALL':
      return state = []
    case 'CHANGE_ALL':
      return [...state].map((task) => {
        task.completed = action.payload
        return task
      }) 
  }
}