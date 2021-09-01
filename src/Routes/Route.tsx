import { Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
// views
import App from '../views/App/App';
import Dane from "../views/City/city";

const queryClient = new QueryClient()

export const Routes = (): React.ReactElement => (
  <QueryClientProvider client={queryClient}>
    <Switch>
      <Route path="/citys">
        <Dane />
      </Route>
      <Route path="/2" render={() => <h1>other route</h1>}/>
      <Route exact path="/">
        <App />
      </Route>
      <Route render={() => <h1>404 not FOUND</h1>}/>
    </Switch>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);