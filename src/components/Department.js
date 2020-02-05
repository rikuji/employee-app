import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';

export class Department extends Component {

  constructor () {
    super();
    this.state = {
      deps: [],
      addModalShow: false
    }
  }

  componentDidMount () {
    this.refreshList();
  }

  refreshList () {
    fetch('http://localhost:49269/api/departments')
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
  }

  componentDidUpdate () {
    this.refreshList();
  }

  render () {
    const { deps } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });

    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>DepartmentID</th>
              <th>DepartmentName</th>
            </tr>
          </thead>
          <tbody>
            {deps.map(dep => (
              <tr key={dep.id}>
                <td>{dep.id}</td>
                <td>{dep.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant='primary'
            onClick={() => this.setState({ addModalShow: true })}
          >Add Department</Button>

          <AddDepModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}   