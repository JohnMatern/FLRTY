import { React, Component } from 'react';


class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            projectsLoaded: false,
        }

        this.loadData = this.loadData.bind(this);
        this.setProjects = this.setProjects.bind(this);
        this.setLoaded = this.setLoaded.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await this.setProjects();
        await this.setLoaded();
    }

    setProjects = async (p) => {
        this.setState({
            projects: p,
        })
    }

    setLoaded = async () => {
        this.setState({
            projectsLoaded: true, 
        })
    }

    render() {

        if (this.state.projectsLoaded) {
            return (
                <div className='projects'>
                    <p>The projects could not load :( </p>
                </div>
            )
        } else {

            return (
                <div className='projects'>
                    <h1>Projects  </h1>
                    {this.state.projects.map((project) => (
                        project.name
                    ))}
                </div>
            )
        }
        
    }
}

export default Projects;