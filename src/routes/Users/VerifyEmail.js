import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useFirebase } from '../../firebases/firebaseDB';

const EmailVerification = () => {
    const [email, setEmail] = useState('');
    const firebase = useFirebase();
   
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleVerifyClick = () => {
        // TODO: Implement email verification logic
        firebase.sendEmailVerificationlink(email);
    };

    React.useEffect(() => {
        if(firebase.user!==null)
        {
            setEmail(firebase.user.email);
        }
      }, []);

    return (
        <div className="login-container">
            <h3>Email verification link has been send please verify</h3>
            <h4>If Not received then click send button</h4>
            <div className="form-group">
           
            <label>{email}</label>
            {/* <TextField
              className="txtField"
              type="email"
              value={email}
              onChange={handleEmailChange}
            /> */}
            </div>
            <div className="form-group">
            <button onClick={handleVerifyClick}>Send Link</button>
            </div>
        </div>
    );
};

export default EmailVerification;
