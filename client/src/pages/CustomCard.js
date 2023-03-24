import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CustomCard(props) {
  const { title, handleClick, showAddButton, showSubmitButton } = props;

  return (
    <div className="container" style={{ minWidth: '100%' }}>
      <div className="container" style={{ minWidth: '95%' }}>
        <div className="row">
          <div className="col-6">
            <h2
              style={{
                textAlign: 'left',
                fontSize: '25px',
                fontWeight: 'bold',
                paddingTop: '25px',
                paddingBottom: '25px',
              }}
            >
              {title}
            </h2>
          </div>
          <div className="col-6 text-end">
            {showAddButton && (
              <Button
                variant="primary"
                style={{ marginTop: '20px', backgroundColor: '#135BB4' }}
                onClick={handleClick}
              >
                + Add Teacher
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="container" style={{ minWidth: '95%' }}>
        <div className="row">
          <div className="col-12">
            <Card
              style={{ boxShadow: '0px 1px 2px 1px rgba(152, 152, 152, 0.2)' }}
            >
              <Card.Body style={{ margin: '10px' }}>{props.children}</Card.Body>
            </Card>
          </div>
        </div>
        {showSubmitButton && (
          <Button
            variant="primary"
            className="float-end"
            style={{ marginTop: '20px', backgroundColor: '#135BB4' }}
            onClick={handleClick}
          >
            Add Teacher
          </Button>
        )}
      </div>
    </div>
  );
}

export default CustomCard;
