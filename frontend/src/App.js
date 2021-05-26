import Header from './components/Header';
import {useEffect} from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import {useDispatch} from 'react-redux';
import {loadUser} from './actions/authActions';
import setAuthToken from './utils/setAuthToken';



if(localStorage.token){
  setAuthToken(localStorage.token)
}
const  App = ()=> {
  const dispatch = useDispatch(); 
 

  useEffect(()=>{
      dispatch(loadUser());

  },[dispatch])

  return (
    <>
        {/* Header */}
        <Header/>
        {/* Main content */}
        <Main/>
        {/* Footer */}
        <Footer/>
    </>
  );
}

export default App;
