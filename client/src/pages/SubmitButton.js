import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

function SubmitButton(props) {
  const { submitBtnText, handleClick, showBackButton, modelName } = props;
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    const backRoute = modelName === 'teacher' ? '/viewTeacher' : '/viewClass';
    navigate(backRoute);
  };

  return (
    <div className="col-12 text-end" style={{ marginTop: '20px' }}>
      {showBackButton && (
        <Button
          variant="outline-primary"
          id="custom-outline-btn"
          onClick={handleBackButtonClick}
          style={{
            marginRight: '20px',
          }}
        >
          <ArrowLeft
            size={15}
            style={{
              marginRight: '5px',
              marginBottom: '3px',
              marginLeft: '0px',
            }}
          />
          Back
        </Button>
      )}
      <Button
        variant="primary"
        style={{ backgroundColor: '#135BB4' }}
        onClick={handleClick}
      >
        {submitBtnText}
      </Button>
    </div>
  );
}

export default SubmitButton;
