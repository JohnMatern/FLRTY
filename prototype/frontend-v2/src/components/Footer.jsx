import { Table } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { RiHome6Line } from 'react-icons/ri'
import { GrMoney } from 'react-icons/gr'
import { CgMenuGridR } from 'react-icons/cg'
 
const Footer = () => {
  let history = useHistory();

  const onClickHome = () => {
    history.push('/')
  }

  const onClickWallet = () => {
    history.push('/wallet')
  }

  const onClickMenu = () => {
    history.push('/menu')
  }
  
  return (
    <Table responsive="sm">
      <tbody className="align-text-middle">
        <tr>
          <td onClick={onClickHome}>
            <center>
              <RiHome6Line />
            </center>
          </td>
          <td onClick={onClickWallet}>
            <center>
              <GrMoney />
            </center>
          </td>
          <td onClick={onClickMenu}>
            <center>
              <CgMenuGridR />
            </center>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Footer;