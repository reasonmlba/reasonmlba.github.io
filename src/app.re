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
      <Box width=(Percent(100.)) backgroundColor=Whitesmoke>
        <Box
          element="section"
          paddingTop=(Px(60))
          paddingBottom=(Px(16))
          display=Flex
          flexDirection=Column
          alignItems=Center>
          <Box element="img" src=cover width=(Percent(70.)) />
          <a href="https://www.meetup.com/ReasonML-BA/">
            <Box
              element="button"
              className="Button Button--primary"
              fontFamily="Montserrat"
              fontWeight=Bold
              marginTop=(Px(30))
              marginBottom=(Px(30))>
              (Rereact.string("Sumate a nuestra meetup"))
            </Box>
          </a>
        </Box>
        <Box backgroundColor=Yellow> (Rereact.string("Helllo")) </Box>
        <Box
          element="section"
          paddingTop=(Px(30))
          paddingBottom=(Px(30))
          display=Flex
          flexDirection=Column
          alignItems=Center
          backgroundColor=White>
          <p>
            (
              Rereact.string(
                {|
                  ReasonML BA es una meetup en Buenos Aires.
                  Nuestras meetups estan relacionadas a React, Javascript y Programacion Funcional.
                  Somos un grupo amigable y de principiantes, si queres aprender, entender o pedir ayuda no dudes en unirte.
                |}
              )
            )
          </p>
        </Box>
        <Test />
      </Box>
  });