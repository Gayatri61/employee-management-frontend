import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import CompanyService from '../services/CompanyService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: [],
                companyDetails:[]
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {

            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
            this.getCompanyDetails();
        });
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    getCompanyDetails(){
        CompanyService.getCompanyDetails().then((res) => {
            this.setState({ companyDetails: res.data});
        });
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });

        this.getCompanyDetails();
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <br></br>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> First Name</th>
                                    <th> Last Name</th>
                                    <th> Email Id</th>
                                    <th> Salary</th>
                                    <th> Address</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> {employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td> {employee.salary}</td>
                                             <td> {employee.address}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                 <br></br>
                 <div className = "row">
                    <h6> Average salary : {this.state.companyDetails.avgSalary}</h6>
                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
