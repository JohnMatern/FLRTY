import { React, Component } from 'react';


class ProjectsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectAddresses: '',
            projectlist: '',
            contentJson: [],
            content: '',
        }

        this.loadData = this.loadData.bind(this);
        this.getProjectAddresses = this.getProjectAddresses.bind(this); 
        this.tableOutput = this.tableOutput.bind(this); 
    }

    componentDidMount = async () => {
        console.log(this.props)
        await this.getProjectAddresses();
        await this.loadData();
        await this.tableOutput();
    }

    getProjectAddresses = async () => {
        console.log('inside projectAddress')
        console.log(this.props)
        console.log(this.props.store)
        this.setState({ 
            projectAddresses:  await this.props.store.methods.getProjectList().call() 
        })
    }

    loadData = async () => {

        for (let i = 0; i < this.state.projectAddresses.length; i++) {
            let project = this.state.projectAddresses[i];
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
        this.setState({ content: content })
    }

    render() {
        console.log("projectList:")
        console.log(this.state.contentJson)
      
        if (this.state.contentJson === '') {
            return (
                <p>The projects could not load :( </p>
            )
        } else {

            const content = this.state.contentJson.map((d) => (
                <tr>
                  <td>{d.projectName}</td>
                  <td>{d.endDate}</td>
                  <td>{d.minVotes}</td>
                  <td>{d.groupName}</td>
                </tr>
              ));

            return (
                <div className='projectList'>
                <table>
                  <thead>
                      <tr>
                        <th>Name</th>
                        <th>End Date</th>
                        <th>Min Votes</th>
                        <th>Group</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content}
                    </tbody>
                  </table>
              </div>
            )
        }
        
    }
}

export default ProjectsList;