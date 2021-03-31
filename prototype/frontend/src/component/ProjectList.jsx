import { React, Component } from 'react';


class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            projectsLoaded: false,
            projectData: '',
        }

        this.loadData = this.loadData.bind(this);
        this.setProjects = this.setProjects.bind(this);
        this.getProjectData = this.getProjectData.bind(this);
    }

    componentDidMount = async () => {
        await this.loadData();
    }

    loadData = async () => {
        await this.setProjects();
        await this.getProjectData();
    }

    setProjects = async () => {
        await this.setState({
            projects: await this.props.store.methods.getProjectList().call()
        })
    }

    getProjectData = async () => {
        let data = [];
            await this.state.projects.map(async (p) => {
                const project = this.props.project;
                const group = this.props.group;
                const json = {};
                json['projectAddress'] = p;
                json['ProjectName'] = await project.methods.getName(p).call();
                json['endDate'] = await project.methods.getEndDate(p).call();
                json['minVotes'] = await project.methods.getMinVotes(p).call();
                json['groupName'] = await group.methods.getName(await project.methods.getGroup(p).call()).call();
                data.push(json);
            });
        this.setState({projectData: await data})
    }

    render() {
        console.log("projectdata:")
        console.log(this.state.projectData)
      
        if (this.state.projectData === '') {
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

export default Projects;