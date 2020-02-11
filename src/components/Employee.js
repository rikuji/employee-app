import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal'

export class Employee extends Component {
  constructor () {
    super();
    this.state = {
      emps: [],
      addModalShow: false,
      editModalShow: false
    }
  }

  componentDidMount () {
    this.refreshList();
  }

  refreshList () {

    fetch('http://localhost:49269/api/employees')
      .then(response => response.json())
      .then(data => {
        this.setState({ emps: data });
      });
  }

  componentDidUpdate () {
    this.refreshList();
  }

  deleteEmp (empId) {
    if (window.confirm('Are you sure?')) {

      fetch('http://localhost:49269/api/departments/' + empId, {
        method: 'DELETE',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  }


  render () {
    const { emps, empid, empname, depmt, mailid, doj } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>EmployeeID</th>
              <th>EmployeeName</th>
              <th>Department</th>
              <th>MailID</th>
              <th>DOJ</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.department.name}</td>
                <td>{emp.email}</td>
                <td>{emp.doj.split('T')[0]}</td>
                <td>

                  <ButtonToolbar>
                    <Button
                      className="mr-2" variant="info"
                      onClick={() => this.setState({
                        editModalShow: true,
                        empid: emp.id,
                        empname: emp.name,
                        depmt: emp.departament,
                        mailid: emp.email,
                        doj: emp.doj
                      })}
                    >
                      Edit
                    </Button>

                    <Button className="mr-2" onClick={() => this.deleteEmp(emp.id)} variant="danger">Delete</Button>

                    <EditEmpModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      empid={empid}
                      empname={empname}
                      depmt={depmt}
                      mailid={mailid}
                      doj={doj}
                    />

                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant='primary'
            onClick={() => this.setState({ addModalShow: true })}
          >Add Employee</Button>

          <AddEmpModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />

        </ButtonToolbar>
      </div>
    );
  }
}   