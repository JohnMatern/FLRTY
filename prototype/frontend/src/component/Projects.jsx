import { React, Component } from 'react';


class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            projectsLoaded: false,
            projectData: []
        }

        this.loadData = this.loadData.bind(this);
        this.setProjects = this.setProjects.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await this.setProjects();
    }

    setProjects = async () => {
        await this.setState({
            projects: await this.props.store.methods.getProjectList().call()
        })

        await this.getProjectData();
    }

    getProjectData = async () => {
        console.log("projects")
        console.log(this.state.projects)
        let data = [];
            this.state.projects.map(async (p) => {
                console.log("p: "+p)
                const project = this.props.project;
                project.options.address = p;
                const group = this.props.group;
                group.options.address = await project.methods.getGroup().call();
                const json = {};
                json['projectAddress'] = p;
                json['ProjectName'] = await project.methods.getName().call();
                json['endDate'] = await project.methods.getEndDate().call();
                json['minVotes'] = await project.methods.getMinVotes().call();
                json['groupName'] = await group.methods.getName().call();
                data.push(json);
            });
        await this.setState({projectData: data})
        console.log(this.state.projectData)
    }

    render() {

        if (this.state.projectData.length == 0) {
            return (
                <div className='projects'>
                    <p>The projects could not load :( </p>
                </div>
            )
        } else {

            const content = this.state.projectData.map((d) => (
                <tr>
                  <td>{d.ProjectName}</td>
                  <td>{d.endDate}</td>
                  <td>{d.minVotes}</td>
                  <td>{d.groupName}</td>
                </tr>
              ));
            return (
                <div className='projects'>
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

export default Projects;