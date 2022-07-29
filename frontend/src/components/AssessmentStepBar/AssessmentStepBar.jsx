import { Popover, Steps } from 'antd';
import React, {useState} from 'react';
import './AssessmentStepBar.css';
import '../../pages/AssessmentPage/AssessmentPage.css';

const { Step } = Steps;

const AssessmentStepBar = (props) => {

    const onStepChange = (e) => {
        switch (e) {
            case 1:
                if (props.officeFinished) {
                    props.setStep(e)
                }
                break;
            case 2:
                if (props.datacentreFinished) {
                    props.setStep(e)
                }
                break;
            default:
                props.setStep(e);
                break;
        }}

        return (
            <Steps current={props.step} onChange={(e) => onStepChange(e)} size='small'>
                <Step title="Office" />
                <Step disabled={!props.officeFinished} title="Additional Info" />
                <Step disabled={!props.datacentreFinished} title="Privacy & More" />
                {/* TODO */}
                <Step title="Report" />
            </Steps>
        )
    }

    export default AssessmentStepBar;