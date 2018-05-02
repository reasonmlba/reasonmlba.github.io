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
      <Col padding=(Px(32))>
        <button onClick=((_) => send(Increment))> (Rereact.string("Increment")) </button>
        <Box margin=(Px(20))> (Rereact.string(string_of_int(state))) </Box>
        <button onClick=((_) => send(Decrement))> (Rereact.string("Decrement")) </button>
        <div> (Rereact.string("Hot code reloading with state")) </div>
        <div> (Rereact.string("Including the reducer")) </div>
      </Col>
  });