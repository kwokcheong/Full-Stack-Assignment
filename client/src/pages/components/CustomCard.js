import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SubmitButton from './SubmitButton';
import { Plus } from 'react-bootstrap-icons';

function CustomCard(props) {
  const { title, handleClick, showAddButton, showSubmitButton, modelName } =
    props;

  const addBtnText = modelName === 'teacher' ? 'Add Teacher' : 'Add Class';
  const submitBtnText = modelName === 'teacher' ? 'Add Teacher' : 'Add Class';

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
                <Plus
                  size={20}
                  style={{ marginBottom: '2px', marginRight: '5px' }}
                />
                {addBtnText}
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
          <SubmitButton
            submitBtnText={submitBtnText}
            handleClick={handleClick}
            showBackButton
            modelName={modelName}
          />
        )}
      </div>
    </div>
  );
}

export default CustomCard;
