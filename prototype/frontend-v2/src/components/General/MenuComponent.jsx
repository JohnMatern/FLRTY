import { useHistory } from "react-router-dom";

const MenuComponent = () => {
  let history = useHistory();

  const onClick = (entry) => {
    switch (entry) {
      case "newGroup":
        history.push('/newGroup');
        break;

      case "editGroups":
        history.push('/');
        break;

      case "newProject":
        history.push('/newProject');
        break;

      case "editProjects":
        history.push('/');
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
          <td onClick={() => {onClick("newGroup")}}>Gruppe anlegen</td>
        </tr>
        <tr>
          <td onClick={() => {onClick("editGroups")}}>Gruppen verwalten</td>
        </tr>
        <tr>
          <td onClick={() => {onClick("newProject")}}>Projekt anlegen</td>
        </tr>
        <tr>
          <td onClick={() => {onClick("editProjects")}}>Projekte verwalten</td>
        </tr>

      </tbody>
    </table>
  );
}

export default MenuComponent;