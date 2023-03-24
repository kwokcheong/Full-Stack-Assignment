import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ViewTeacher() {
  return (
    <div className="container" style={{ maxWidth: '95%' }}>
      <h2
        style={{
          textAlign: 'left',
          fontSize: '25px',
          fontWeight: 'bold',
          paddingTop: '25px',
          paddingBottom: '25px',
        }}
      >
        Teachers
      </h2>
      <Card
        style={{
          boxShadow: '0px 1px 2px 1px rgba(152, 152, 152, 0.2)',
        }}
      >
        <div>
          <Card.Body style={{ margin: '10px' }}>
            <Table>
              <thead style={{ backgroundColor: 'rgba(182, 182, 182, 0.2)' }}>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default ViewTeacher;
