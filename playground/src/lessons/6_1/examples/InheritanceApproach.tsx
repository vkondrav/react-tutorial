// @ts-nocheck
// ❌ Inheritance approach (don't do this in React)
class Dialog extends React.Component {
  render() {
    return <div className="dialog">{this.renderContent()}</div>;
  }
  renderContent() {
    return null;
  } // Override in subclass
}

class WelcomeDialog extends Dialog {
  renderContent() {
    return <h1>Welcome!</h1>;
  }
}

class AlertDialog extends Dialog {
  renderContent() {
    return <h1>Warning!</h1>;
  }
}
