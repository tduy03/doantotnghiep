import React from 'react';
import { Button } from '@mui/material';

interface StepperNavigationProps {
    activeStep: number;
    steps: string[];
    handleNext: () => void;
    handleBack: () => void;
}

const StepperNavigation: React.FC<StepperNavigationProps> = ({ activeStep, steps, handleNext, handleBack }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                style={{ marginRight: '10px' }}
            >
                Quay lại
            </Button>

            <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
            </Button>
        </div>
    );
};

export default StepperNavigation;
