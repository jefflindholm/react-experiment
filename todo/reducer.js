import deepFreeze from 'deep-freeze';
import expect from 'expect';

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                },
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if ( todo.id !== action.id ) {
                    return todo;
                }
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            });
    }
    return state;
};

const testAddTodo = () => {
    const state1 = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn stuff',
    };
    const state2 = [
        {
            id: 0,
            text: 'Learn stuff',
            completed: false,
        },
    ];
    deepFreeze(state1);
    deepFreeze(action);
    expect(
        todos(state1, action)
    ).toEqual(state2);
}

const testToggleTodo = () => {
    const state1 = [
        {
            id: 0,
            text: 'Learn stuff',
            completed: false,
        },
        {
            id: 1,
            text: 'Learn redux',
            completed: false,
        },
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1,
    };
    const state2 = [
        {
            id: 0,
            text: 'Learn stuff',
            completed: false,
        },
        {
            id: 1,
            text: 'Learn redux',
            completed: true,
        },
    ];
    deepFreeze(state1);
    deepFreeze(action);
    expect(
        todos(state1, action)
    ).toEqual(state2);
}

testAddTodo();
testToggleTodo();
console.log('tests passed');