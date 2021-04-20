import { UserQrCode, Whitelist } from '../components/index'

const Register = () => {
  

  return (
    <div className="page">
      <h5>pls whitelist</h5>
      <h6>go to access hub an show qr code:<br /></h6>
      <UserQrCode />
       <h6><br />or use invitecode:</h6>
       <Whitelist func={'addUserByCode'} />
    </div>
  );
}

export default Register;