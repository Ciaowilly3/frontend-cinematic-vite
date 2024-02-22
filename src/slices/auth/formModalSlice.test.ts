import formModalSlice, {
  formModalState,
  toggleFormModal,
} from './formModalSlice';

describe('formModalSlice', () => {
  it('should handle toggleFormModal', () => {
    const initialState: formModalState = false;

    const nextState = formModalSlice.reducer(initialState, toggleFormModal());

    expect(nextState).toBe(true);
  });
});
