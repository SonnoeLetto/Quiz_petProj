import { connect } from "react-redux";
import  Layout  from "./hoc/Layout/Layout";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Layout className="App">
      <Outlet />
      {/* <Quiz>

      </Quiz> */}
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(App) ;
