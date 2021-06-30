import React, { Component } from 'react';

////////////////// Bootstarp Link is Used in index.html for styling ///////////////////

class Table extends Component {


  state = {
    users: null,
    total: null,
    per_page: null,
    current_page: 2
  }


  componentDidMount() {
    this.makeHttpRequestWithPage(2);
  }


  makeHttpRequestWithPage = async pageNumber => {
    const resp_data = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await resp_data.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  }


  render() {

    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map(people => (
        <tr key={people.id}>
          <td>{people.id}</td>
          <td>{people.first_name} {people.last_name} </td>
          <td>{people.first_name} </td>
          <td>{people.last_name} </td>
          <td>{people.email}</td>
          <td><img src={people.avatar} alt=""></img></td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }

////////////////// Bootstarp Link is Used in index.html for styling ///////////////////

      renderPageNumbers = pageNumbers.map(p_no => {
         let classes = this.state.current_page === p_no ? 'btn btn-primary'  : 'btn btn-outline-warning';

        return (
          <button key={p_no} className={classes} onClick={() => this.makeHttpRequestWithPage(p_no)}>{p_no}</button>
        );
      });
    }

    return (

////////////////// Bootstarp Link is Used in index.html for styling ///////////////////
      <div>

        <table className="table table-striped">
          <thead className= "thead-dark">
            <tr>
              <th>Serial No</th>
              <th>Full Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>

        <div className="button_r_l" >
          <button className="btn btn-secondary" onClick={() => this.makeHttpRequestWithPage(1)}>&#8592;</button>
          {renderPageNumbers}
          <button className="btn btn-secondary" onClick={() => this.makeHttpRequestWithPage(2)}>&#8594;</button>
        </div>

      </div>
    );
  }

}

export default Table;