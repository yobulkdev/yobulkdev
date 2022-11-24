export function collection(state, action) {
  switch (action.type) {
    case 'SET_COLLECTION_NAME':
      return { ...state, collection: action.payload };
    case 'SET_CUR_TEMPLATE':
      return { ...state, template: action.payload };
    case 'SET_CUR_TEMPLATE_EDIT':
      return { ...state, isTemplateEditing: action.payload };
    case 'SET_CUR_TEMPLATE_EDIT_COLUMN':
      return { ...state, templateColumnToEdit: action.payload };
    default:
      return state;
  }
}
