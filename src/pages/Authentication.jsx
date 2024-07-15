import axios from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

const Authentication = () => {
  
  const defaultReferer = 'http://127.0.0.1:5173/'; 
  const referer = encodeURIComponent(document.referrer || defaultReferer);
  // const getCode = async() => {
  //   try {
  //     const serverUrl = "https://bf6d-112-196-45-10.ngrok-free.app/api/login";
  //     const codeResponse = await axios.get(serverUrl);
  //     console.log("code response", codeResponse)
  //   } catch (error) {
  //     console.log("error in code", error);
  //   }
  // }

  // const getCode = async () => {
  //   try {
  //     const serverUrl = "https://bf6d-112-196-45-10.ngrok-free.app/api/login";
  //     const codeResponse = await axios.get(serverUrl, {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*'
  //       }
  //     });
  //     console.log("code response", codeResponse);
  //   } catch (error) {
  //     console.log("error in code", error);
  //   }
  // }
  

  // const authenticateUser = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const serverUrl = "https://bf6d-112-196-45-10.ngrok-free.app/api/oauth";
  //     const codeResponse = await axios.post(serverUrl);
  //     console.log('response', codeResponse)

  //   } catch (error) {
  //     console.log("error in authentication", error);
  //   }
  // }

  // useEffect(()=> {
  //   getCode()
  // },[])
  return (
    <div className="auth-wrapper">
        <h1 className="auth-heading">Connect to the Communtiy</h1>
        {/* <form onSubmit={authenticateUser}> */}
          <div className="form-wrapper">
            <div>
              <label>Community Url</label>
              <input type="text" className="input-text" placeholder="Enter base url of the community"></input>
            </div>
            <div>
              <label>Community username/email</label>
              <input type="text" className="input-text" placeholder="Enter username or email"></input>
            </div>
            <div>
              <label>Community password</label>
              <input type="text" className="input-text" placeholder="Enter password"></input>
            </div>
            <div>
              <a href={`https://bf6d-112-196-45-10.ngrok-free.app/api/login?referer=${referer}`}>
                <h2 className="connect-btn">Connect</h2>
              </a>
            </div>
          </div>
        {/* </form> */}
      </div>
  )
}

export default Authentication;