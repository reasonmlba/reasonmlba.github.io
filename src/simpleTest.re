open RereactElements;

open Jsxnice;

let createElement = (~children as _, _) =>
  Rereact.element({
    debugName: "Test",
    initialState: () => true,
    didMount: _self => (),
    reducer: (_, _) => Rereact.NoUpdate,
    render: self =>
      <Col flex=1 height=(Percent(100.))>
        <Test />
        <Box flex=1 backgroundColor=Green> (Rereact.string("Helloa friend")) </Box>
        <Box flex=1 backgroundColor=Blue> (Rereact.string("Helloa friend")) </Box>
      </Col>
  });