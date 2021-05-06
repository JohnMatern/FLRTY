import { useHistory } from "react-router-dom";

const MenuComponent = () => {
  let history = useHistory();

  const onClick = (entry) => {
    switch (entry) {

      case "myGroups":
        history.push('/myGroups');
        break;

      case "newGroup":
        history.push('/newGroup');
        break;

      case "editGroups":
        history.push('/editGroup');
        break;

      case "myProjects":
        history.push('/myProjects');
        break;

      case "newProject":
        history.push('/newProject');
        break;

      case "editProjects":
        history.push('/editProject');
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
          <td onClick={() => { onClick("myProjects") }}>Meine Projekte</td>
        </tr>
        <tr>
          <td onClick={() => { onClick("newProject") }}>Projekt anlegen</td>
        </tr>
        <tr>
          <td onClick={() => { onClick("editProjects") }}>Projekte verwalten</td>
        </tr>
        <tr>
          <td onClick={() => { onClick("myGroups") }}>Meine Gruppen</td>
        </tr>
        <tr>
          <td onClick={() => { onClick("newGroup") }}>Gruppe anlegen</td>
        </tr>
        <tr>
          <td onClick={() => { onClick("editGroups") }}>Gruppen verwalten</td>
        </tr>




      </tbody>
    </table>
  );
}

export default MenuComponent;