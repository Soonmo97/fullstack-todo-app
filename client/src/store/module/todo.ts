import { Todo, TodoState } from '../../types/interface';

const initialState: TodoState = {
  list: [],
};

// let CREATE = "todo/CREATE" as const;
const INIT = 'todo/INIT' as const;
const CREATE = 'todo/CREATE' as const;
const DONE = 'todo/DONE' as const;

// [추가] todo 삭제에 대한 type
const DELETE = 'todo/DELETE' as const;
const UPDATE = 'todo/UPDATE' as const;

let count = initialState.list.length;
initialState['nextID'] = count;

export const init = (data: Todo[]) => ({
  type: INIT,
  data, //object {id, text, done}
});
export const create = (payload: { id: number; text: string }) => ({
  type: CREATE, //string
  payload, //object {id, text}
});

export const done = (id: number) => ({
  type: DONE, //string
  id, //number
});

// [추가] todo 삭제 및 수정에 대한 action
export const del = (id: number) => ({
  type: DELETE,
  id,
});

export const update = (id: number, text: string) => ({
  type: UPDATE,
  id,
  text,
});
interface Init {
  type: typeof INIT;
  data: Todo[];
}

interface Create {
  type: typeof CREATE;
  payload: { id: number; text: string };
}
interface Done {
  type: typeof DONE;
  id: number;
}

// [추가] todo 삭제 및 글 수정에 대한 interface
interface Delete {
  type: typeof DELETE;
  id: number;
}

interface Update {
  type: typeof UPDATE;
  id: number;
  text: string;
}

// Action type 변경
type Action = Create | Done | Init | Delete | Update;

export function todoReducer(state = initialState, action: Action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID:
          action.data.length === 0
            ? 1
            : action.data[action.data.length - 1].id + 1,
      };
    case CREATE:
      if (action.payload.text.trim() === '') return state;
      return {
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };
    case DONE:
      return {
        ...state,
        list: state.list.map((li) => {
          if (li.id === action.id) {
            return {
              ...li,
              done: true,
            };
          } else {
            return li;
          }
        }),
      };

    // [추가] TODO 삭제 및 수정 case 분기
    case DELETE:
      return {
        ...state,
        list: state.list.filter((li) => li.id !== action.id),
      };
    case UPDATE:
      return {
        ...state,
        list: state.list.map((li) =>
          li.id === action.id
            ? {
                ...li,
                text: action.text,
              }
            : li
        ),
      };
    default:
      return state;
  }
}
