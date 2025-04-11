import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from './FormField';

describe('FormField Component', () => {
  // Test that the component renders correctly with basic props
  test('renders the label and input field correctly', () => {
    render(
      <FormField 
        label="Full Name" 
        name="name" 
        value="" 
        onChange={() => {}} 
      />
    );
    
    // Check that the label is rendered
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    
    // Check that the input field is rendered and has the correct attributes
    const input = screen.getByLabelText('Full Name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'name');
  });

  // Test that the input value changes when typed into
  test('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    
    render(
      <FormField 
        label="Email" 
        name="email" 
        value="" 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Test that required marker is shown when required=true
  test('shows required marker when field is required', () => {
    render(
      <FormField 
        label="Phone Number" 
        name="phone" 
        value="" 
        onChange={() => {}} 
        required={true} 
      />
    );
    
    const requiredMark = screen.getByText('*');
    expect(requiredMark).toBeInTheDocument();
    expect(requiredMark).toHaveClass('required-mark');
  });

  // Test that error message is displayed when provided
  test('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    
    render(
      <FormField 
        label="Address" 
        name="address" 
        value="" 
        onChange={() => {}} 
        error={errorMessage} 
      />
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    
    const input = screen.getByLabelText('Address');
    expect(input).toHaveClass('form-input-error');
  });

  // Test that different input types work correctly
  test('renders different input types correctly', () => {
    render(
      <FormField 
        label="Start Date" 
        name="startDate" 
        type="date" 
        value="2023-01-01" 
        onChange={() => {}} 
      />
    );
    
    const input = screen.getByLabelText('Start Date');
    expect(input).toHaveAttribute('type', 'date');
    expect(input).toHaveValue('2023-01-01');
  });
});