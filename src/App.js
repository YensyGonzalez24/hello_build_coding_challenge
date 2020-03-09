import React from 'react';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Layout from './components/Main/Layout/Layout'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Profile from './components/Profile/Profile';
import Repo from './components/Repo/Repo';
import Calendar from './components/Calendar/Calendar';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/SignIn' component={()=>{return <SignIn/>}}/>
          <Route exact path='/CreateAccount' component={()=><SignUp index={0}/>}/>
          <Route path='/CreateAccount/Github' component={()=><SignUp index={1}/>}/>
          <Route path='/CreateAccount/Google' component={()=><SignUp index={2}/>}/>
          <Route path='/Profile' component={()=> <Layout interface={<Profile/>}/>}/>
          <Route path='/Repositories' component={()=> <Layout interface={<Repo/>}/>}/>
          <Route path='/Calendar' component={()=> <Layout interface={<Calendar/>}/>}/>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
