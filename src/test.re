open RereactElements;

open Jsxnice;

type action =
  | Increment
  | Decrement;

let createElement = (~children as _, _) =>
  Rereact.element({
    debugName: "Test",
    initialState: () => 1,
    didMount: _self => (),
    reducer: (action, state) =>
      switch action {
      | Increment => Rereact.Update(state + 1)
      | Decrement => Rereact.Update(state - 1)
      },
    render: ({state, send}) =>
      <Box>
        <button onClick=((_) => send(Increment))> (Rereact.string("Increment")) </button>
        <Box margin=(Px(16))> (Rereact.string(string_of_int(state))) </Box>
        <button onClick=((_) => send(Decrement))> (Rereact.string("Decrement")) </button>
      </Box>
  });