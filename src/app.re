open RereactElements;

open Jsxnice;

let cover: string = [%bs.raw {| require("./assets/cover.png") |}];

let createElement = (~children as _, _) =>
  Rereact.element({
    debugName: "App",
    initialState: () => (),
    didMount: _self => (),
    reducer: (_, _) => Rereact.NoUpdate,
    render: (_) =>
      <Box width=(Percent(100.)) height=(Percent(100.)) backgroundColor=Whitesmoke>
        <Box
          element="section"
          paddingTop=(Px(60))
          paddingBottom=(Px(16))
          display=Flex
          flexDirection=Column
          alignItems=Center>
          <Box element="img" src=cover width=(Percent(70.)) />
          <Box
            element="button"
            className="Button Button--primary"
            marginTop=(Px(30))
            marginBottom=(Px(30))>
            (Rereact.stringToElement("Sumate a nuestra meetup"))
          </Box>
        </Box>
        <Box
          element="section"
          padding=(Px(60))
          display=Flex
          flexDirection=Column
          alignItems=Center
          backgroundColor=White>
          <p>
            (
              Rereact.stringToElement(
                {|
                  ReasonML BA es una meetup en Buenos Aires.
                  Nuestras meetups estan relacionadas a React, Javascript y Programacion Funcional.
                  Somos un grupo amigable y de principiantes, si queres aprender, entender o pedir ayuda no dudes en unirte.
                |}
              )
            )
          </p>
        </Box>
      </Box>
  });