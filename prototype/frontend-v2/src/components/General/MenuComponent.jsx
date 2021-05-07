import { useHistory } from "react-router-dom";

const MenuComponent = () => {
  let history = useHistory();

  const onClick = (entry) => {
    switch (entry) {

      case "myGroups":
        history.push('/myGroups');
        break;

      case "myProjects":
        history.push('/myProjects');
        break;

      case "muh":
        history.push('/');
        break;

      case "meh":
        history.push('/');
        break;


      default:
        break;
    }
  }

  return (
    <table className="table table-hover border-bottom" style={{ width: "80%", textAlign: "center", marginTop: "15px" }}>
      <tbody>

        <tr>
          <td onClick={() => { onClick("myProjects") }}>Projekte verwalten</td>
        </tr>
        <tr>
          <td onClick={() => { onClick("myGroups") }}>Gruppen verwalten</td>
        </tr>

      </tbody>
    </table>
  );
}

export default MenuComponent;