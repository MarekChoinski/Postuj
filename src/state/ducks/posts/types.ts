export const ADD_TODO = "todo_app/ADD_TODO";
export const DELETE_TODO = "todo_app/DELETE_TODO";
export const TOGGLE_TODO = "todo_app/TOGGLE_TODO";
export const EDIT_TODO = "todo_app/EDIT_TODO";

export const EDIT_TITLE = "todo_app/TOGGLE_TITLE";



export type Todo = Readonly<{
    text: string,
    done: boolean,
    id: string,
}>;

export interface TodosState {
    readonly title: string,
    readonly todos: ReadonlyArray<Todo>,
}





interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: Pick<Todo, 'text'>;
}

interface DeleteTodoAction {
    type: typeof DELETE_TODO;
    payload: Pick<Todo, 'id'>;
}

interface ToggleTodoAction {
    type: typeof TOGGLE_TODO;
    payload: Pick<Todo, 'id'>;
}

interface EditTodoAction {
    type: typeof EDIT_TODO;
    payload: Pick<Todo, 'id' | 'text'>;
}

interface EditTitleAction {
    type: typeof EDIT_TITLE;
    payload: {
        title: string,
    }
}


export type TodoActionTypes =
    AddTodoAction |
    DeleteTodoAction |
    ToggleTodoAction |
    EditTodoAction;

export type TitleActionTypes = EditTitleAction;