import * as React from "react";
import { HashRouter, Route, RouteComponentProps } from "react-router-dom";

import { TouchBar, Button } from "../src";

export default function App() {
  return (
    <HashRouter>
      <Route path="/" exact component={MainScreen} />
      <Route path="/about" exact component={AboutScreen} />
    </HashRouter>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily:
          "-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function Dialog({ onClose }: { onClose: () => any }) {
  return (
    <>
      <TouchBar prevId="home">
        <Button label="Dialog" />
      </TouchBar>
      <div
        style={{
          top: "20%",
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20,
          borderRadius: 8,
          border: "1px solid rgba(0, 0, 0, .3)",
          background: "rgba(255, 255, 255, .9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 5px rgba(0, 0, 0, .2)",
        }}
      >
        <h2>Dialog</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

const colors = [
  "#21374b",
  "#6B8E23",
  "#8A2BE2",
  "#1E90FF",
  "#808000",
  "#F5FFFA",
  "#FA8072",
];

function MainScreen(props: RouteComponentProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [buttonColor, setButtonColor] = React.useState(colors[0]);

  const { current: onChangeColorClick } = React.useRef(() =>
    setButtonColor(colors[Math.round(Math.random() * colors.length)])
  );

  const { current: onButtonClick } = React.useRef((...args: any[]) =>
    alert("Clicked!")
  );

  const { current: onAboutClick } = React.useRef((...args: any[]) =>
    props.history.push("/about")
  );

  return (
    <>
      <TouchBar id="home">
        <Button
          label="Change color"
          backgroundColor={buttonColor}
          onClick={onChangeColorClick}
        />
        <Button label="Show alert" onClick={onButtonClick} />
        <Button label="Navigate to About" onClick={onAboutClick} />
      </TouchBar>

      <Layout>
        <h1>React Touchbar Electron</h1>
        <button onClick={() => setShowDialog(true)}>Open Dialog</button>

        <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
          <div
            onClick={onChangeColorClick}
            style={{
              background: buttonColor,
              width: 24,
              height: 24,
              borderRadius: 4,
              marginRight: 10,
              cursor: "pointer",
            }}
          />
          Current button color
        </div>

        {showDialog && <Dialog onClose={() => setShowDialog(false)} />}
      </Layout>
    </>
  );
}

function AboutScreen(props: RouteComponentProps) {
  const { current: onBackClick } = React.useRef((...args: any[]) =>
    props.history.goBack()
  );
  return (
    <>
      <TouchBar>
        <Button label="👈 Back to Home" onClick={onBackClick} />
      </TouchBar>

      <Layout>
        <h1>About Page</h1>
      </Layout>
    </>
  );
}
