export function user(state, action) {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
