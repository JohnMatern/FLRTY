import QRCode from 'qrcode.react';
import { Context } from '../../utils/Store'
import { useEffect, useContext, useState } from 'react';

const UserQrCode = () => {
  const [state, dispatch] = useContext(Context);
  return (
    <div className="qrcode">
      <QRCode value={state.account} size={200}/>
      <div className="qr-address">{state.account.substring(0,7)}....{state.account.substring(35,)}</div>
    </div>
  );
}

export default UserQrCode;