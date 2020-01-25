// 从数据字段的维度来处理数据
const reducers = {
  todos(state, action) {
    const { type, payload } = action;
    switch (type) {
      case "set":
        return payload;
      case "add":
        return [...state, payload];
      case "remove":
        return state.filter(todo => {
          return todo.id !== payload;
        });
      case "toggle":
        return state.map(todo => {
          return todo.id === payload
            ? {
                ...todo,
                complete: !todo.complete
              }
            : todo;
        });
      default:
        break;
    }
    return state;
  },
  incrementCount(state, action) {
    const { type } = action;
    switch (type) {
      case "set":
      case "add":
        return state + 1;
    }
    return state;
  }
};
function combineReducers(reducers) {
  return function reducer(state, action) {
    const changed = {};
    for (const key in reducers) {
      changed[key] = reducers[key](state[key], action);
    }
    return {
      ...state,
      ...changed
    };
  };
}

// function reducer (state, action) {
//   const { type, payload } = action;
//   const { todos, incrementCount } = state
//   switch (type) {
//     case 'set':
//       return {
//         ...state,
//         todos: payload,
//         incrementCount: incrementCount + 1
//       }
//     case 'add':
//       return {
//         ...state,
//         todos: [...todos, payload],
//         incrementCount: incrementCount + 1
//       }
//     case 'remove':
//       return {
//         ...state,
//         todos: todos.filter(todo => {
//           return todo.id !== payload;
//         })
//       }
//     case 'toggle':
//       return {
//         ...state,
//         todos: todos.map(todo => {
//           return todo.id === payload ? {
//             ...todo,
//             complete: !todo.complete
//           } : todo
//         })
//       }
//     default:
//       break;
//   }
// }
export default combineReducers(reducers);
