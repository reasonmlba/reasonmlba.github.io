open RereactElements;

open Jsxnice;

let createElement = (~children as _, _) =>
  Rereact.element({
    debugName: "Test",
    initialState: () => true,
    didMount: _self => (),
    reducer: (_, _) => Rereact.NoUpdate,
    render: self => <Col flex=1 height=(Percent(100.))> <Test /> </Col>
  });