// to create a model/interface which defines a state
interface State {
  isLoading: boolean;
}

// create an object with a propety state (yes or no - true or false)
const initialState: State = {
  isLoading: false
};

// method which returns a new state
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      };
  }
}
