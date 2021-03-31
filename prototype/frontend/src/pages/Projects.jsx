import { React, Component } from 'react';
import { ProjectList } from '../component/index'; 


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectAddresses: '',
            projectlist: '',
            contentJson: [],
            content: '',
        }
    }


    componentDidMount = async () => {
        console.log(this.props)
        await this.getProjectAddresses();
        await this.loadData();
        await this.tableOutput();
    }

    getProjectAddresses = async () => {
        this.setState({projectAddresses: await this.props.store.methods.getProjectList().call()})
    }

    loadData = async () => {

        for(let i = 0; i < this.state.projectAddresses.length; i++) {
            let project=this.state.projectAddresses[i];
            let projectName = await this.props.project.methods.getName(project).call();
            let group = await this.props.project.methods.getGroup(project).call();
            let groupName = await this.props.group.methods.getName(group).call();
            let votes = await this.props.vote.methods.balanceOf(project).call();
            let minVotes = await this.props.project.methods.getMinVotes(project).call();
            let endDate = await this.props.project.methods.getEndDate(project).call();

            await this.state.contentJson.push({
                "project": project,
                "projectName": projectName,
                "group": group,
                "groupName": groupName,
                "votes": votes,
                "minVotes": minVotes,
                "endDate": endDate,
            })
        }
       // return;
    }

    tableOutput = async () => {
       let content = this.state.contentJson.map((c) => (
            <tr>
              <td>{c.projectName}</td>
              <td>{c.groupName}</td>
              <td>{c.votes}</td>
              <td>{c.minVotes}</td>
              <td>{c.endDate}</td>
            </tr>
          ));
          this.setState({content: content})
    }


    render() {
        return (
            <div className="projects">
                <h1>Projectlist</h1>
                <div>
          <table>
            <thead>
                <tr>
                <th>Name</th>
                  <th>Group</th>
                  <th>Votes</th>
                  <th>minVotes</th>
                  <th>endDate</th>
                </tr>
              </thead>
              <tbody>
                {this.state.content}
              </tbody>
            </table>
        </div>
            </div>
        )
    }
}

export default Projects;