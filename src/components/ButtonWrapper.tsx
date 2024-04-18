"use-client"
import React from 'react';
import { Button } from './ui/button';

export default function ButtonWrapper({ children, onClick }) {
 return (
    <Button onClick={onClick}>
      {children}
    </Button>
 );
}

